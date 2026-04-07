-- ============================================================
-- OrionX Clínicas — Schema Supabase
-- Execute este arquivo no SQL Editor do Supabase:
-- https://app.supabase.com → seu projeto → SQL Editor
-- ============================================================

-- 1. TABELA PRINCIPAL DE LEADS
-- ============================================================
CREATE TABLE IF NOT EXISTS leads_clinicas (
  -- Identificação
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW(),

  -- Dados de contato
  nome            TEXT NOT NULL,
  telefone        TEXT NOT NULL,

  -- Agendamento
  agendamento_data  TEXT NOT NULL,        -- ex: "07/04/2026" (formato BR exibido ao usuário)
  agendamento_hora  TEXT NOT NULL,        -- ex: "14:00"
  agendamento_iso   TIMESTAMPTZ,          -- timestamp ISO 8601 calculado pelo JS para APIs

  -- Qualificação (6 perguntas do formulário)
  pergunta_desafio   TEXT,               -- Qual o principal desafio na clínica?
  pergunta_gargalo   TEXT,               -- Gargalo ou processo manual?
  pergunta_sistemas  TEXT,               -- Ferramentas/sistemas em uso (CRM, ERP, etc.)
  pergunta_equipe    TEXT,               -- Tamanho da equipe: "1-3", "4-10", "11+"
  pergunta_detalhes  TEXT,               -- Expectativas e detalhes adicionais

  -- Rastreamento UTM (capturado da URL)
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  utm_term        TEXT,
  utm_content     TEXT,
  pagina_origem   TEXT DEFAULT 'lp_clinicas',

  -- Google Meet (preenchido pelo n8n após gerar o evento)
  meet_link       TEXT,
  meet_event_id   TEXT,

  -- Status do pipeline
  status          TEXT DEFAULT 'novo'
    CHECK (status IN ('novo', 'confirmado', 'em_reuniao', 'proposta_enviada', 'fechado', 'cancelado', 'no_show')),

  -- Controle do webhook
  webhook_enviado  BOOLEAN DEFAULT FALSE,
  webhook_at       TIMESTAMPTZ,
  webhook_response TEXT                  -- resposta do n8n para debug
);

-- 2. ÍNDICES PARA PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_leads_clinicas_status
  ON leads_clinicas(status);

CREATE INDEX IF NOT EXISTS idx_leads_clinicas_created
  ON leads_clinicas(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_clinicas_agendamento
  ON leads_clinicas(agendamento_iso);

CREATE INDEX IF NOT EXISTS idx_leads_clinicas_telefone
  ON leads_clinicas(telefone);

-- 3. TRIGGER: atualiza updated_at automaticamente
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_leads_clinicas_updated_at
  BEFORE UPDATE ON leads_clinicas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 4. ROW LEVEL SECURITY (RLS)
-- IMPORTANTE: permite INSERT público (do formulário), 
-- mas só leitura com a Service Role Key (n8n / painel)
-- ============================================================
ALTER TABLE leads_clinicas ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode inserir um lead (formulário público)
CREATE POLICY "Permitir insert público"
  ON leads_clinicas
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Somente a service role pode ler e atualizar (backend / n8n)
CREATE POLICY "Somente service role pode ler"
  ON leads_clinicas
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Somente service role pode atualizar"
  ON leads_clinicas
  FOR UPDATE
  TO service_role
  USING (true);

-- Permite que qualquer pessoa veja apenas se um horário está ocupado
-- Útil para o calendário desabilitar botões já agendados
CREATE POLICY "Permitir visualização de disponibilidade"
  ON leads_clinicas
  FOR SELECT
  TO anon
  USING (status != 'cancelado');

-- 5. VIEW ÚTIL: resumo do pipeline de leads
-- ============================================================
CREATE OR REPLACE VIEW view_pipeline_clinicas AS
SELECT
  id,
  created_at AT TIME ZONE 'America/Sao_Paulo' AS criado_em_br,
  nome,
  telefone,
  agendamento_data,
  agendamento_hora,
  pergunta_equipe AS tamanho_equipe,
  status,
  meet_link,
  webhook_enviado
FROM leads_clinicas
ORDER BY created_at DESC;

-- ============================================================
-- COMO USAR NO n8n:
-- 
-- Para atualizar meet_link após criar o evento no Google:
-- UPDATE leads_clinicas 
-- SET meet_link = '{{ $node["Google Calendar"].json.hangoutLink }}',
--     meet_event_id = '{{ $node["Google Calendar"].json.id }}'
-- WHERE id = '{{ $json.lead_id }}'
-- ============================================================
