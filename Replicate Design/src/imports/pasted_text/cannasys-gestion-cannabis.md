Título: CannaSYS: Sistema de Gestão para Terapia com Cannabis
RESUMO:
A eficácia da cannabis medicinal é comprovada para pacientes com diversas condições médicas,
como dor crônica, doenças autoimunes e neurológicas, além de ansiedade e depressão
especialmente aqueles que não respondem aos tratamentos convencionais. Existem diversas
associações sem fins lucrativos que fornecem tratamentos à base de cannabis medicinal e essas
associações enfrentam desafios significativos na automação e integração de seus processos,
devido à especificidade do nicho em que operam. Assim, o objetivo geral do projeto é criar um
sistema ERP (Enterprise Resource Planning) que automatize e integre as atividades dos
diferentes setores dessas associações, proporcionando um controle abrangente das informações
relacionadas à interação entre paciente, médico e farmacêutico, bem como a produção e
dispensação de medicamentos, além de gestão financeira e de recursos humanos. A
metodologia adotada para o desenvolvimento do CannaSYS segue um modelo incremental com
suporte da metodologia Scrum, complementado pela abordagem Lean Inception. Este modelo
ágil e iterativo promove a entrega contínua de valor e a adaptação às mudanças do mercado. O
processo se inicia com uma Lean Inception, um workshop colaborativo que define a visão do
produto, as personas, as jornadas do usuário e o MVP (Minimum Viable Product). Em seguida,
o planejamento da Sprint 0 define a arquitetura inicial do sistema e configura os ambientes de
desenvolvimento. A partir da Sprint 1, o ciclo regular do Scrum é seguido com sprints recorrentes,
onde funcionalidades são implementadas e testadas continuamente para garantir a qualidade do
software. Revisões ao final de cada sprint permitem o feedback dos stakeholders, enquanto
retrospectivas ajudam a identificar melhorias no processo de desenvolvimento. O sistema de
gestão CannaSYS foi dividido em módulos que serão implementados de forma sequencial e
incremental, de modo que cada módulo será desenvolvido seguindo todo padrão da metodologia
Scrum apoiado pela abordagem Lean Inception, cada módulo desenvolvido será integrado de
modo compor o ERP específico que atenderá às associações sem fins lucrativos de atendimento
à pacientes que utilizam de terapias baseadas na cannabis medicinal. A organização modular do
CannaSYS, com módulos para gestão de prontuário, receituário, cultivo, produção, dispensação,
financeiro e recursos humanos, permite uma adaptação eficaz às necessidades dos usuários e
demandas do mercado, garantindo um cuidado ao paciente mais eficaz e personalizado. A
combinação da Lean Inception com o Scrum oferece uma estrutura robusta para o
desenvolvimento ágil do sistema, assegurando que ele atenda às necessidades e expectativas
dos usuários, integrando eficientemente os setores médico e farmacêutico e melhorando a
experiência dos associados das entidades que utilizam a cannabis medicinal.
Palavras-Chave:
Cannabis medicinal; Desenvolvimento ágil de software; Sistema de Gestão.
1. INTRODUÇÃO:
A cannabis vem sendo utilizada com finalidade medicinal e tem se apresentado
bastante eficaz no tratamento de diversas doenças como dor crônica, inflamações, doenças
autoimunes, condições neurológicas (como epilepsia e esclerose múltipla) e sintomas de
ansiedade e depressão, especialmente em pacientes que não respondem aos tratamentos
convencionais. Diversas associações sem fins lucrativos formadas por pacientes que fazem uso
dos fitocomplexos presentes na cannabis foram formadas pelo Brasil a fim de garantir que seus
associados continuem tendo acesso à terapia utilizando este medicamento.
Por ser um nicho muito específico, essas associações não possuem sistemas de
gestão que faça de forma adequada a automação dos processos e integração das atividades
que cada um de seus setores executa. Este projeto busca desenvolver um sistema para suprir
essa necessidade, desenvolvendo um sistema ERP que permitirá controlar as informações de
uma associação sem fins lucrativos que lide com a produção e dispensação de medicamentos a
base de cannabis medicinal.
2. JUSTIFICATIVA:
A utilização da cannabis para fins medicinais já é uma realidade nacional e
internacional. Ela tem se mostrado eficaz na redução da dor crônica, uma propriedade valorizada,
especialmente em pacientes que não respondem aos analgésicos convencionais (MCDONAGH
et al; 2022). Além disso, a cannabis possui propriedades anti-inflamatórias e é usada para tratar
condições como artrite e colite (ATALAY; JAROCKA-KARPOWICZ; SKRZYDLEWSKA, 2019).
Seus efeitos na modulação do sistema imunológico também ajudam no manejo de doenças
autoimunes. Para condições neurológicas, como a epilepsia e a esclerose múltipla, a cannabis
demonstra a capacidade de reduzir a frequência e a severidade das convulsões e de aliviar os
espasmos musculares e a rigidez (FRAGOSO; CARRA; MACIAS, 2020). O alívio dos sintomas
de ansiedade e depressão também é um aspecto importante do uso medicinal da cannabis,
oferecendo uma alternativa para pacientes que podem não ter respondido bem a terapias
psiquiátricas tradicionais (STACK; WHEATE; SCHUBERT, 2022).
No Brasil, essa temática foi protagonizada por diferentes associações sem fins
lucrativos de pacientes ao redor do país, que lutam pelo acesso aos seus associados por terapia
que envolva a utilização dos fitocomplexos presentes nessa planta, encontrando assim inúmeros
desafios e realidades que evoluem na medida que o número de interessados por esse tratamento
aumenta.
Uma associação sem fins lucrativos de pacientes de cannabis para fins medicinais
possui uma série de desafios a serem superados, desde o momento de sua criação e
estruturação até a manutenção de suas atividades. Algumas dessas entidades atuam de forma
multidisciplinar, trazendo desde o amparo farmacológico, medicinal, nutricional, psicológico,
social e veterinário ao associado, tendo em vista que tanto seres humanos quanto animais
podem se beneficiar dessa terapia. Essa amplitude de processos gera um ambiente que
necessariamente carece de aplicativos e tecnologias que integrem todas as áreas. Essa
integração possibilitaria a melhora no funcionamento organizacional da associação e
gerenciamento de recursos, como recursos humanos, definição de uma cadeia de suprimentos
confiável e padronizada para todas as necessidades (insumos da área de farmácia, sementes,
substratos, nutrientes, equipamentos e EPI’s), facilidade no agendamento de consultas e retorno
do associado ao seu médico prescritor, elaboração e upload de documentos fundamentais para
o atendimento e acompanhamento médico, como laudo, receitas e prontuários. A integração
eficaz entre as áreas médica e farmacêutica através de um sistema de gestão de pacientes de
cannabis medicinal é crucial para maximizar os benefícios terapêuticos e garantir a segurança
dos pacientes. Um sistema de gestão bem implementado facilita a comunicação e o fluxo de
informações entre médicos e farmacêuticos, fundamental para o tratamento com cannabis, que
exige precisão na prescrição, dosagem e monitoramento.
Médicos que prescrevem cannabis medicinal precisam de acesso a prontuários
eletrônicos detalhados, que incluam históricos médicos completos e registros de tratamentos
anteriores. Isso permite uma avaliação mais precisa das necessidades do paciente e uma
formulação de tratamento personalizada. Ao mesmo tempo, quando esses prontuários estão
integrados com o sistema farmacêutico, os farmacêuticos podem verificar rapidamente as
receitas, entender o contexto clínico das prescrições e monitorar a dispensação dos
medicamentos fitoterápicos.
Além disso, um sistema integrado ajuda na manutenção de registros precisos de
dosagem e resposta ao tratamento, o que é essencial para o ajuste fino das prescrições. Isso
não só melhora a eficácia do tratamento, mas também minimiza os riscos de efeitos adversos e
interações medicamentosas. A plataforma de gestão pode também alertar médicos e
farmacêuticos sobre possíveis contraindicações ou interações medicamentosas, aumentando a
segurança do paciente.
A implementação de tecnologias que permitam essa integração também contribui para
a aderência ao tratamento, pois facilita o processo de renovação e ajuste de receitas, além de
permitir que os pacientes recebam orientações claras e contínuas sobre o uso do medicamento.
Com um sistema que registra e analisa continuamente os resultados do tratamento, médicos e
farmacêuticos podem trabalhar juntos para otimizar os regimes terapêuticos, resultando em um
cuidado ao paciente mais eficaz e personalizado.
Em suma, um sistema de gestão de pacientes para cannabis medicinal que integre
eficientemente os setores médico e farmacêutico não apenas simplifica a gestão clínica, mas
também reforça a cadeia de cuidados ao paciente, garantindo que o tratamento seja administrado
de maneira segura, precisa e responsiva às necessidades individuais dos pacientes.
A criação de aplicativos e tecnologias voltadas para gerenciamento e integração das
diversas áreas previamente expostas, principalmente áreas sensíveis e que precisam de
estabilidade, confiabilidade e rastreabilidade de dados, como as áreas administrativas e
financeiras (cadastro e banco de dados do paciente, sistema de pagamento e acompanhamento
da situação cadastral) assim como as áreas técnicas (cultivo, farmacêutica e área médica)
possibilitaria aos gestores maior controle e eficiência da entidade na tomada de decisões, no
planejamento estratégico e também no natural processo de expansão da associação. Hoje,
diferentes aplicativos são utilizados para possibilitar a atuação da associação, aplicativos esses
que não se comunicam e não possuem integração de banco de dados, impossibilitando a
consolidação e unificação de dados, assim como a possibilidade de um relatório integrado pelo
mesmo sistema ou aplicativo.
Assim, o problema identificado à qual o presente projeto busca propor uma solução é
o da ausência de amparo tecnológico às associações sem fins lucrativos de pacientes de
cannabis através do desenvolvimento de um sistema ERP. A complexidade das ações e
operações inerentes a esse tipo de associação requer uma solução abrangente e moderna, que
busque integrar e otimizar todos os diferentes processos, melhorando a eficiência geral da
associação, resultando por fim na melhora da experiência do associado.
3. OBJETIVOS:
3.1. Objetivo Geral:
Desenvolver um sistema ERP (Enterprise Resource Planning), ou seja, um software de
gestão empresarial, para automatizar processos e integrar as atividades dos diferentes setores
de uma associação sem fins lucrativos que trata de pacientes de cannabis medicinal. O ERP
permitirá controlar as informações da associação, incluindo a interação paciente-médico-
farmacêutico, prontuário do paciente, produção e dispensação de medicamentos, financeiro e
recursos humanos.
3.2. Objetivo(s) Específico(s):
• Desenvolver o módulo de interação paciente-médico-farmacêutico;
• Desenvolver o módulo prontuário do paciente;
• Desenvolver o módulo de controle da produção do óleo de cannabis medicinal;
• Desenvolver o módulo de dispensação do óleo de cannabis medicinal;
• Desenvolver o módulo financeiro;
• Desenvolver o módulo de Recursos Humanos.
4. METODOLOGIA:
Para o desenvolvimento do CannaSYS: Sistema de Gestão para Terapia com
Cannabis, será adotado um modelo de desenvolvimento incremental, com suporte da
metodologia Scrum e complementado pela abordagem da Lean Inception. Esse modelo promove
uma abordagem ágil e iterativa desde o início do projeto, focando na entrega contínua de valor
aos usuários finais e na adaptação às mudanças do mercado.
O projeto começará com uma Lean Inception, um workshop colaborativo que envolverá
todas as partes interessadas, incluindo o Product Owner, Scrum Master, equipe de
desenvolvimento e stakeholders relevantes. Durante a Lean Inception, serão definidos a visão
do produto, personas, jornadas do usuário, MVP (Minimum Viable Product) e outros artefatos
essenciais para guiar o desenvolvimento. Esta fase fornecerá uma compreensão compartilhada
do projeto e estabelecerá uma direção clara para as próximas etapas, começando pela
implementação da gestão de prontuário e receituário.
Com os resultados da Lean Inception em mãos, começa o planejamento da Sprint 0 no
contexto do Scrum. Nesta fase, ocorrerá o refinamento do Product Backlog, a definição da
arquitetura inicial do sistema e a configuração dos ambientes de desenvolvimento. Essa Sprint
inicial estabelecerá as bases para o trabalho subsequente da equipe de desenvolvimento.
A partir da Sprint 1, o ciclo regular do Scrum será seguido, com Sprints recorrentes de
desenvolvimento. Cada Sprint começará com uma reunião de planejamento, onde o Product
Owner selecionará os itens prioritários do Product Backlog para serem desenvolvidos. Durante
a Sprint, a equipe de desenvolvimento implementará as funcionalidades selecionadas, seguindo
as práticas ágeis de desenvolvimento e realizando testes de forma contínua para garantir a
qualidade do software.
Ao final de cada Sprint, realizaremos uma revisão, onde o incremento desenvolvido
será demonstrado aos stakeholders para feedback. Essa retroalimentação será incorporada ao
Product Backlog, ajudando a orientar as prioridades para as próximas Sprints. Após a revisão, a
equipe realizará uma retrospectiva para refletir sobre o processo de desenvolvimento da Sprint
e identificar oportunidades de melhoria para os próximos ciclos.
Ao longo do projeto, continuaremos a iterar e melhorar incrementalmente o CannaSYS.
Além da gestão de prontuário e receituário, o sistema contará com módulos para gestão de
cultivo, produção, dispensação, financeiro e de recursos humanos. Essa abordagem modular
permitirá uma adaptação mais eficaz às necessidades específicas dos usuários e às demandas
do mercado. A combinação da Lean Inception com o Scrum fornecerá uma estrutura robusta para
o desenvolvimento ágil do sistema, garantindo que atenda às necessidades e expectativas dos
usuários.
REFERÊNCIAS BIBLIOGRÁFICAS:
ATALAY, Sinemyiz; JAROCKA-KARPOWICZ, Iwona; SKRZYDLEWSKA, Elzbieta. Antioxidative
and Anti-Inflammatory Properties of Cannabidiol. Antioxidants, v. 9, n. 1, p. 21, 25 dez. 2019.
MDPI AG. http://dx.doi.org/10.3390/antiox9010021
CARDOSO, Leandro da C. Frameworks Back End. SRV Editora LTDA, 2021. Disponível em:
https://integrada.minhabiblioteca.com.br/#/books/9786589965879/.
FRAGOSO, Yara Dadalti; CARRA, Adriana; MACIAS, Miguel Angel. Cannabis and multiple
sclerosis. Expert Review of Neurotherapeutics, v. 20, n. 8, p. 849-854, 18 jun. 2020. Informa
UK Limited. http://dx.doi.org/10.1080/14737175.2020.1776610.
KIM, Gene; HUMBLE, Jez; DEBOIS, Patrick; WILLIS, John. Manual de DevOps. Editora Alta
Books, 2018. Disponível em: https://integrada.minhabiblioteca.com.br/#/books/9788550816197/.
KRUG, Steve. Don't Make Me Think: A Common Sense Approach to Web Usability. New
Riders, 2014.
MCDONAGH, Marian S.; MORASCO, Benjamin J.; WAGNER, Jesse; AHMED, Azrah Y.; FU,
Rongwei; KANSAGARA, Devan; CHOU, Roger. Cannabis-Based Products for Chronic Pain.
Annals of Internal Medicine, v. 175, n. 8, p. 1143-1153, ago. 2022. American College of
Physicians. http://dx.doi.org/10.7326/m21-4520.
PRESSMAN, Roger S.; MAXIM, Bruce R. Engenharia de Software. Grupo A, 2021. Disponível
em: https://integrada.minhabiblioteca.com.br/#/books/9786558040118/.
STACK, Sophie K.; WHEATE, Nial J.; SCHUBERT, Elise A.. Medicinal Cannabis for the Treatment
of Anxiety Disorders: a narrative review. Current Treatment Options in Psychiatry, v. 9, n. 3, p.
163-173, 23 abr. 2022. Springer Science and Business Media LLC.
http://dx.doi.org/10.1007/s40501-022-00260-8.
TIDWELL, Jenifer. Designing Interfaces: Patterns for Effective Interaction Design. O'Reilly
Media, 2010.
CRONOGRAMA:
Atividade Ano
1
Ano
2
Ano
3
Ano
4
Ano
5
Desenvolver o módulo de interação paciente-médico-
farmacêutico X
Desenvolver o módulo prontuário do paciente; X
Desenvolver o módulo de controle da produção do óleo de
cannabis medicinal; X
Desenvolver o módulo de dispensação do óleo de
cannabis medicinal; X
Desenvolver o módulo financeiro; X
Desenvolver o módulo de Recursos Humanos. X
5. PLANO DE TRABALHO 01:
5.1. Título:
Desenvolvimento de Sistema de Gerenciamento de Prontuário Eletrônico e Receituário para
Terapia com Cannabis (BackEnd)
5.2. Introdução:
O desenvolvimento do sistema de gerenciamento de prontuário eletrônico e receituário
para terapia com cannabis medicinal demanda a construção de um back-end robusto e seguro.
Esse componente será responsável pelo armazenamento, processamento e recuperação dos
dados relacionados aos pacientes e prescrições médicas, garantindo a confiabilidade e a
segurança das informações.
5.3. Objetivos Específicos:
• Realizar uma análise detalhada dos requisitos do sistema e definir a arquitetura de back-
end mais adequada.
• Implementar APIs eficientes para facilitar a comunicação entre o front-end e o banco de
dados.
• Desenvolver a lógica de negócios necessária para a manipulação precisa dos dados de
prontuário e receituário.
• Integrar o back-end com serviços de terceiros, como sistemas de pagamento e APIs de
fornecedores de cannabis medicinal.
• Realizar testes rigorosos para assegurar a funcionalidade e a segurança do sistema.
5.4. Metodologia:
• Levantamento de requisitos: revisão da documentação do projeto e reuniões com a
equipe.
• Projeto da arquitetura: definição dos componentes principais e das tecnologias a serem
utilizadas.
• Implementação: desenvolvimento das funcionalidades de back-end conforme
especificações.
• Testes: execução de testes unitários, de integração e de aceitação para validar o
sistema.
• Documentação: elaboração de documentação técnica e de usuário para facilitar a
manutenção e o uso do sistema.
5.5. Resultados Esperados:
• Sistema de back-end funcional e seguro para gerenciamento de prontuário eletrônico e
receituário.
• APIs bem documentadas e de fácil integração com o front-end e outros sistemas.
• Testes completos e relatórios de bugs para garantir a qualidade do software.
5.6. Referência Bibliográfica
ATALAY, Sinemyiz; JAROCKA-KARPOWICZ, Iwona; SKRZYDLEWSKA, Elzbieta. Antioxidative
and Anti-Inflammatory Properties of Cannabidiol. Antioxidants, v. 9, n. 1, p. 21, 25 dez. 2019.
MDPI AG. http://dx.doi.org/10.3390/antiox9010021
CARDOSO, Leandro da C. Frameworks Back End. SRV Editora LTDA, 2021. Disponível em:
https://integrada.minhabiblioteca.com.br/#/books/9786589965879/.
FRAGOSO, Yara Dadalti; CARRA, Adriana; MACIAS, Miguel Angel. Cannabis and multiple
sclerosis. Expert Review of Neurotherapeutics, v. 20, n. 8, p. 849-854, 18 jun. 2020. Informa
UK Limited. http://dx.doi.org/10.1080/14737175.2020.1776610.
KIM, Gene; HUMBLE, Jez; DEBOIS, Patrick; WILLIS, John. Manual de DevOps. Editora Alta
Books, 2018. Disponível em: https://integrada.minhabiblioteca.com.br/#/books/9788550816197/.
MCDONAGH, Marian S.; MORASCO, Benjamin J.; WAGNER, Jesse; AHMED, Azrah Y.; FU,
Rongwei; KANSAGARA, Devan; CHOU, Roger. Cannabis-Based Products for Chronic Pain.
Annals of Internal Medicine, v. 175, n. 8, p. 1143-1153, ago. 2022. American College of
Physicians. http://dx.doi.org/10.7326/m21-4520.
PRESSMAN, Roger S.; MAXIM, Bruce R. Engenharia de Software. Grupo A, 2021. Disponível
em: https://integrada.minhabiblioteca.com.br/#/books/9786558040118/.
STACK, Sophie K.; WHEATE, Nial J.; SCHUBERT, Elise A.. Medicinal Cannabis for the Treatment
of Anxiety Disorders: a narrative review. Current Treatment Options in Psychiatry, v. 9, n. 3, p.
163-173, 23 abr. 2022. Springer Science and Business Media LLC.
http://dx.doi.org/10.1007/s40501-022-00260-8.
5.7. Cronograma:
Atividade 1 2 3 4 5 6 7 8 9 10 11 12
Levantamento de requisitos e projeto X
Implementação do Back-End X X X X X
Testes e depuração X X
Documentação X
Revisões finais e entrega X X X
6. PLANO DE TRABALHO 02:
6.1. Título:
Desenvolvimento da Interface de Usuário para o Sistema de Gestão de Prontuário
Eletrônico e Receituário para Terapia com Cannabis (FrontEnd)
6.2. Introdução:
A interface de usuário (UI) desempenha um papel crucial na interação dos usuários
com o sistema de gestão de prontuário eletrônico e receituário para terapia com cannabis
medicinal. Este plano de trabalho foca no desenvolvimento de uma UI intuitiva, responsiva e
esteticamente agradável, que facilite a experiência do usuário e promova uma interação eficaz
com o sistema.
6.3. Objetivos Específicos:
• Projetar layouts e fluxos de navegação para diferentes telas e funcionalidades.
• Desenvolver componentes de UI reutilizáveis e escaláveis usando tecnologias web
modernas.
• Implementar recursos de interatividade, como formulários dinâmicos e feedback em
tempo real.
• Garantir a compatibilidade com diversos dispositivos e navegadores por meio de testes
de responsividade e compatibilidade.
• Colaborar com o back-end para integrar a UI com as APIs e garantir uma experiência de
usuário fluida.
6.4. Metodologia:
• Análise de requisitos de UI: compreensão dos requisitos de funcionalidade e usabilidade.
• Design de UI/UX: criação de wireframes, mockups e protótipos interativos.
• Desenvolvimento front-end: implementação de interfaces usando HTML, CSS e
JavaScript.
• Testes de usabilidade: avaliação da interface com usuários reais para identificar e corrigir
problemas.
• Integração com back-end: conexão da interface com as APIs de back-end para
funcionalidade completa.
6.5. Resultados Esperados:
• Interface de usuário visualmente atraente e fácil de usar para o sistema de gestão de
prontuário eletrônico e receituário.
• Componentes de UI bem projetados e implementados, garantindo consistência e
usabilidade.
• Testes de usabilidade concluídos e feedback incorporado para melhorias contínuas.
6.6. Referência Bibliográfica:
ATALAY, Sinemyiz; JAROCKA-KARPOWICZ, Iwona; SKRZYDLEWSKA, Elzbieta. Antioxidative
and Anti-Inflammatory Properties of Cannabidiol. Antioxidants, v. 9, n. 1, p. 21, 25 dez. 2019.
MDPI AG. http://dx.doi.org/10.3390/antiox9010021
FRAGOSO, Yara Dadalti; CARRA, Adriana; MACIAS, Miguel Angel. Cannabis and multiple
sclerosis. Expert Review of Neurotherapeutics, v. 20, n. 8, p. 849-854, 18 jun. 2020. Informa
UK Limited. http://dx.doi.org/10.1080/14737175.2020.1776610.
KRUG, Steve. Don't Make Me Think: A Common Sense Approach to Web Usability. New
Riders, 2014.
MCDONAGH, Marian S.; MORASCO, Benjamin J.; WAGNER, Jesse; AHMED, Azrah Y.; FU,
Rongwei; KANSAGARA, Devan; CHOU, Roger. Cannabis-Based Products for Chronic Pain.
Annals of Internal Medicine, v. 175, n. 8, p. 1143-1153, ago. 2022. American College of
Physicians. http://dx.doi.org/10.7326/m21-4520.
PRESSMAN, Roger S.; MAXIM, Bruce R. Engenharia de Software. Grupo A, 2021. Disponível
em: https://integrada.minhabiblioteca.com.br/#/books/9786558040118/.
STACK, Sophie K.; WHEATE, Nial J.; SCHUBERT, Elise A.. Medicinal Cannabis for the Treatment
of Anxiety Disorders: a narrative review. Current Treatment Options in Psychiatry, v. 9, n. 3, p.
163-173, 23 abr. 2022. Springer Science and Business Media LLC.
http://dx.doi.org/10.1007/s40501-022-00260-8.
TIDWELL, Jenifer. Designing Interfaces: Patterns for Effective Interaction Design. O'Reilly
Media, 2010.
6.7. Cronograma:
Atividade 1 2 3 4 5 6 7 8 9 10 11 12
Análise de requisitos e design X
Implementação do Front-End X X X X X
Testes e depuração X X
Integração com Back-End X X
Revisões finais e entrega X X
7. PLANO DE TRABALHO 03:
7.1. Título:
Design de Produto para o Sistema de Gestão de Prontuário Eletrônico e Receituário
para Terapia com Cannabis (Product Design)
7.2. Introdução:
Este plano de trabalho visa conduzir o design de produto para o sistema de gestão de
prontuário eletrônico e receituário para terapia com cannabis medicinal. O objetivo é criar uma
experiência de usuário (UX) centrada no usuário, levando em consideração as necessidades e
expectativas dos pacientes e profissionais de saúde.
7.3. Objetivos Específicos:
• Realizar pesquisas de mercado e análise de concorrência para identificar oportunidades
e tendências.
• Conduzir entrevistas e workshops com stakeholders para compreender as necessidades
dos usuários.
• Criar personas e jornadas do usuário para representar diferentes perfis e cenários de
uso.
• Projetar fluxos de interação e telas de interface que atendam às necessidades e
expectativas dos usuários.
• Iterar sobre o design com base em feedback de usuários e testes de usabilidade para
garantir uma experiência otimizada.
7.4. Metodologia:
• Pesquisa de mercado: análise de produtos similares e tendências de design na área de
saúde e tecnologia.
• Entrevistas com stakeholders: identificação de requisitos e expectativas dos usuários
finais.
• Criação de personas: definição de perfis de usuário com base em características
demográficas e comportamentais.
• Design iterativo: prototipagem de baixa e alta fidelidade para validação de conceitos e
iteratividade.
• Testes de usabilidade: avaliação da experiência do usuário com protótipos para
identificar problemas e oportunidades de melhoria.
7.5. Resultados Esperados:
• Design de produto centrado no usuário para o sistema de gestão de prontuário eletrônico
e receituário.
• Documentação de design abrangente, incluindo personas, jornadas do usuário e
wireframes.
• Protótipos iterativos refinados com base em feedback de usuários e testes de
usabilidade.
7.6. Referência Bibliográfica:
ATALAY, Sinemyiz; JAROCKA-KARPOWICZ, Iwona; SKRZYDLEWSKA, Elzbieta. Antioxidative
and Anti-Inflammatory Properties of Cannabidiol. Antioxidants, v. 9, n. 1, p. 21, 25 dez. 2019.
MDPI AG. http://dx.doi.org/10.3390/antiox9010021
CARDOSO, Leandro da C. Frameworks Back End. SRV Editora LTDA, 2021. Disponível em:
https://integrada.minhabiblioteca.com.br/#/books/9786589965879/.
FRAGOSO, Yara Dadalti; CARRA, Adriana; MACIAS, Miguel Angel. Cannabis and multiple
sclerosis. Expert Review of Neurotherapeutics, v. 20, n. 8, p. 849-854, 18 jun. 2020. Informa
UK Limited. http://dx.doi.org/10.1080/14737175.2020.1776610.
KIM, Gene; HUMBLE, Jez; DEBOIS, Patrick; WILLIS, John. Manual de DevOps. Editora Alta
Books, 2018. Disponível em: https://integrada.minhabiblioteca.com.br/#/books/9788550816197/.
KRUG, Steve. Don't Make Me Think: A Common Sense Approach to Web Usability. New
Riders, 2014.
MCDONAGH, Marian S.; MORASCO, Benjamin J.; WAGNER, Jesse; AHMED, Azrah Y.; FU,
Rongwei; KANSAGARA, Devan; CHOU, Roger. Cannabis-Based Products for Chronic Pain.
Annals of Internal Medicine, v. 175, n. 8, p. 1143-1153, ago. 2022. American College of
Physicians. http://dx.doi.org/10.7326/m21-4520.
PRESSMAN, Roger S.; MAXIM, Bruce R. Engenharia de Software. Grupo A, 2021. Disponível
em: https://integrada.minhabiblioteca.com.br/#/books/9786558040118/.
STACK, Sophie K.; WHEATE, Nial J.; SCHUBERT, Elise A.. Medicinal Cannabis for the Treatment
of Anxiety Disorders: a narrative review. Current Treatment Options in Psychiatry, v. 9, n. 3, p.
163-173, 23 abr. 2022. Springer Science and Business Media LLC.
http://dx.doi.org/10.1007/s40501-022-00260-8.
TIDWELL, Jenifer. Designing Interfaces: Patterns for Effective Interaction Design. O'Reilly
Media, 2010.
7.7. Cronograma:
Atividade 1 2 3 4 5 6 7 8 9 10 11 12
Pesquisa de mercado e entrevistas X X
Criação de personas e jornadas do usuário X X
Design iterativo X X X X
Testes de usabilidade X X
Refinamento do design X X
8. PLANO DE TRABALHO 04:
8.1. Título:
Desenvolvimento e Coordenação do Sistema de Gestão de Prontuário Eletrônico e
Receituário para Terapia com Cannabis
8.2. Introdução:
O papel de um líder técnico full stack é essencial no desenvolvimento de sistemas
complexos, como o sistema de gestão de prontuário eletrônico e receituário para terapia com
cannabis. Este plano de trabalho destina-se a fornecer direção técnica, liderança e coordenação
para garantir o sucesso do projeto, desde a concepção até a entrega.
8.3. Objetivos Específicos:
• Coordenação das equipes de desenvolvimento back-end e front-end para garantir a
integração eficaz e o alinhamento com os objetivos do projeto.
• Desenvolvimento e implementação de soluções técnicas inovadoras para desafios
específicos do projeto, como segurança de dados e interoperabilidade.
• Fornecer orientação técnica e suporte para a resolução de problemas complexos e
tomada de decisões técnicas.
• Colaboração estreita com as partes interessadas para garantir que os requisitos do
usuário sejam compreendidos e atendidos de forma eficaz.
• Liderança na implementação de práticas de desenvolvimento ágil e DevOps para
garantir entregas contínuas e de alta qualidade.
8.4. Metodologia:
• Planejamento e definição de escopo: revisão dos requisitos do projeto e definição de
metas e prazos.
• Design arquitetural: definição da arquitetura do sistema e das tecnologias a serem
utilizadas.
• Desenvolvimento iterativo: implementação de funcionalidades em ciclos iterativos,
priorizando as necessidades do usuário.
• Coordenação e colaboração: reuniões regulares com as equipes de desenvolvimento,
revisões de código e resolução de problemas.
• Testes e qualidade: implementação de testes automatizados, revisões de código e
garantia da qualidade do software.
• Entrega e manutenção: implantação do sistema em ambiente de produção e suporte
contínuo para manutenção e atualizações.
8.5. Resultados Esperados:
• Coordenação eficaz das equipes de desenvolvimento e entrega de um sistema de gestão
de prontuário eletrônico e receituário funcional e de alta qualidade.
• Soluções técnicas inovadoras e escaláveis para desafios específicos do projeto, como
segurança de dados e interoperabilidade.
• Implementação de práticas de desenvolvimento ágil e DevOps para garantir entregas
contínuas e de alta qualidade.
• Satisfação das partes interessadas e usuários finais com o sistema entregue, atendendo
às suas necessidades e expectativas.
8.6. Referência Bibliográfica:
ATALAY, Sinemyiz; JAROCKA-KARPOWICZ, Iwona; SKRZYDLEWSKA, Elzbieta. Antioxidative
and Anti-Inflammatory Properties of Cannabidiol. Antioxidants, v. 9, n. 1, p. 21, 25 dez. 2019.
MDPI AG. http://dx.doi.org/10.3390/antiox9010021
CARDOSO, Leandro da C. Frameworks Back End. SRV Editora LTDA, 2021. Disponível em:
https://integrada.minhabiblioteca.com.br/#/books/9786589965879/.
FRAGOSO, Yara Dadalti; CARRA, Adriana; MACIAS, Miguel Angel. Cannabis and multiple
sclerosis. Expert Review of Neurotherapeutics, v. 20, n. 8, p. 849-854, 18 jun. 2020. Informa
UK Limited. http://dx.doi.org/10.1080/14737175.2020.1776610.
KIM, Gene; HUMBLE, Jez; DEBOIS, Patrick; WILLIS, John. Manual de DevOps. Editora Alta
Books, 2018. Disponível em: https://integrada.minhabiblioteca.com.br/#/books/9788550816197/.
KRUG, Steve. Don't Make Me Think: A Common Sense Approach to Web Usability. New
Riders, 2014.
MCDONAGH, Marian S.; MORASCO, Benjamin J.; WAGNER, Jesse; AHMED, Azrah Y.; FU,
Rongwei; KANSAGARA, Devan; CHOU, Roger. Cannabis-Based Products for Chronic Pain.
Annals of Internal Medicine, v. 175, n. 8, p. 1143-1153, ago. 2022. American College of
Physicians. http://dx.doi.org/10.7326/m21-4520.
PRESSMAN, Roger S.; MAXIM, Bruce R. Engenharia de Software. Grupo A, 2021. Disponível
em: https://integrada.minhabiblioteca.com.br/#/books/9786558040118/.
STACK, Sophie K.; WHEATE, Nial J.; SCHUBERT, Elise A.. Medicinal Cannabis for the Treatment
of Anxiety Disorders: a narrative review. Current Treatment Options in Psychiatry, v. 9, n. 3, p.
163-173, 23 abr. 2022. Springer Science and Business Media LLC.
http://dx.doi.org/10.1007/s40501-022-00260-8.
TIDWELL, Jenifer. Designing Interfaces: Patterns for Effective Interaction Design. O'Reilly
Media, 2010.
8.7. Cronograma:
Atividade 1 2 3 4 5 6 7 8 9 10 11 12
Planejamento e definição de escopo X
Design arquitetural X X
Desenvolvimento iterativo X X X X X
Coordenação e colaboração X X
Testes e qualidade X
Entrega e manutenção X