import { Link } from 'react-router-dom'

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-[19px] md:text-[22px] font-semibold text-[#1C2B24]">{titulo}</h2>
      <div className="mt-3 space-y-3 text-[15px] md:text-[16px] leading-relaxed text-gray-700">{children}</div>
    </section>
  )
}

export function Sobre() {
  return (
    <div className="min-h-full overflow-y-auto bg-[#FAFAF8]">
      <header className="sticky top-0 z-10 border-b border-[#E2E8E5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[58px] max-w-[820px] items-center gap-3 px-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-1.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50"
          >
            ← Voltar ao fluxo
          </Link>
          <span className="font-display text-[15px] md:text-[17px] font-semibold text-[#1C2B24]">Sobre este guia</span>
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-4 py-8 pb-16">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0E4429] font-display text-[19px] font-bold text-white">
          AE
        </div>
        <h1 className="mt-4 font-display text-[26px] md:text-[34px] font-bold leading-tight text-[#1C2B24]">
          Um guia interativo para entender a assistência estudantil
        </h1>
        <p className="mt-4 text-[16px] md:text-[17px] leading-relaxed text-gray-700">
          Este aplicativo apresenta, de forma interativa e acessível, o fluxo da Política de Assistência
          Estudantil (PAE) no campus Juazeiro do Instituto Federal da Bahia (IFBA): o caminho completo dos
          auxílios estudantis, da nomeação da comissão responsável até o pagamento e o acompanhamento dos
          estudantes beneficiários.
        </p>

        <Secao titulo="De onde vem este fluxograma">
          <p>
            O fluxograma foi elaborado por <strong>Stéphanni Catherinne Carvalho Cardoso</strong> como parte
            do Produto Educacional da sua dissertação de mestrado,{' '}
            <em>Análise da Política de Assistência Estudantil no campus Juazeiro do IFBA</em>, desenvolvida no
            Programa de Pós-graduação em Educação Profissional e Tecnológica (ProfEPT) do Instituto Federal
            do Sertão Pernambucano, campus Salgueiro, sob orientação do Prof. Dr. Francisco Kelsen de
            Oliveira.
          </p>
          <p>
            A pesquisa analisou os impactos, limites e possibilidades da PAE para a permanência e o êxito dos
            estudantes do ensino médio integrado do campus Juazeiro, a partir de análise documental (editais,
            atas e portarias de 2021 a 2025), questionários e entrevistas com estudantes, servidores e membros
            da comissão que gere a política.
          </p>
        </Secao>

        <Secao titulo="Por que um fluxograma interativo">
          <p>
            A pesquisa identificou que muitos estudantes enfrentam dificuldades logo no início do processo:
            editais divulgados de forma desigual, dependência de canais informais como grupos de WhatsApp,
            exigências documentais que pesam mais sobre quem está em maior vulnerabilidade e dúvidas sobre
            prazos, critérios e responsáveis. Em um dos processos seletivos analisados, cerca de 75% das
            inscrições foram inicialmente indeferidas, principalmente por problemas de documentação, e boa
            parte foi revertida depois, com recursos e orientação.
          </p>
          <p>
            Este guia enfrenta esse problema tornando o processo transparente: cada etapa mostra o que
            acontece, quem é o responsável, qual a base legal, quais documentos estão envolvidos e o que o
            estudante precisa fazer. O modo trilha guiada percorre o fluxo etapa por etapa, e o glossário
            explica as siglas e os termos institucionais.
          </p>
        </Secao>

        <Secao titulo="A política por trás do fluxo">
          <p>
            A assistência estudantil foi instituída nacionalmente pelo Decreto nº 7.234/2010, que criou o
            Programa Nacional de Assistência Estudantil (PNAES). Em 2024, a Lei nº 14.914 consolidou o
            programa como Política Nacional de Assistência Estudantil, ampliando seus objetivos para
            contemplar não apenas a permanência, mas também o êxito acadêmico e a promoção da equidade.
          </p>
          <p>
            No campus Juazeiro do IFBA, a política se materializa no Programa de Assistência e Apoio ao
            Estudante (PAAE), operacionalizado por editais de seleção conduzidos pela Comissão de Gestão da
            Assistência Estudantil (CGAE), com análise socioeconômica realizada por assistente social e
            pagamento executado pelo Departamento de Contabilidade, Orçamento e Finanças (DCOF).
          </p>
        </Secao>

        <Secao titulo="Mais que descrever: acompanhar">
          <p>
            O diferencial da proposta está no acompanhamento contínuo. Além de descrever as etapas, os setores
            envolvidos e as atribuições dos responsáveis, o fluxograma incorpora mecanismos de monitoramento
            dos estudantes beneficiários: a proposta é que cada reunião da comissão inclua uma pauta de análise
            de indicadores como frequência, desempenho acadêmico e situações de risco de evasão, permitindo
            intervenções em tempo hábil. Assim, o fluxo deixa de ser apenas um retrato dos procedimentos
            administrativos e passa a orientar a gestão da política como um processo contínuo de monitoramento,
            avaliação e tomada de decisão.
          </p>
        </Secao>

        <Secao titulo="Para quem é este material">
          <p>
            O guia é destinado prioritariamente aos estudantes do campus Juazeiro do IFBA — em especial aos que
            desejam solicitar ou já recebem auxílios — e à comissão responsável pela gestão da política. Também
            pode apoiar servidores, famílias e outras instituições da Rede Federal interessadas em organizar e
            comunicar seus próprios fluxos de assistência estudantil.
          </p>
        </Secao>

        <div className="mt-10 rounded-2xl border border-[#E2E8E5] bg-white p-5">
          <div className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Ficha do produto</div>
          <dl className="mt-3 space-y-2 text-[14px] leading-relaxed text-gray-700">
            <div>
              <dt className="inline font-semibold text-[#1C2B24]">Autora: </dt>
              <dd className="inline">Stéphanni Catherinne Carvalho Cardoso</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-[#1C2B24]">Orientador: </dt>
              <dd className="inline">Prof. Dr. Francisco Kelsen de Oliveira</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-[#1C2B24]">Programa: </dt>
              <dd className="inline">
                Mestrado Profissional em Educação Profissional e Tecnológica (ProfEPT) — IF Sertão-PE, campus
                Salgueiro
              </dd>
            </div>
            <div>
              <dt className="inline font-semibold text-[#1C2B24]">Dissertação: </dt>
              <dd className="inline">Análise da Política de Assistência Estudantil no campus Juazeiro do IFBA (2026)</dd>
            </div>
          </dl>
        </div>

        <Link
          to="/"
          className="mt-8 inline-block rounded-2xl bg-[#0E4429] px-5 py-3 text-[15px] font-semibold text-white hover:bg-[#14532D]"
        >
          ▶ Explorar o fluxo interativo
        </Link>
      </main>
    </div>
  )
}
