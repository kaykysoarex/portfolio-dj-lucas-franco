# Lucas Franco — Site do DJ

Landing page single-page para o DJ Lucas Franco (casamentos, debutantes de 15 anos,
formaturas e eventos corporativos), construída em React + Vite, com o objetivo
principal de levar o visitante a "CONTRATAR AGORA" pelo WhatsApp.

---

## 1. Análise visual das fotos e da logo

- **Logo**: wordmark cromado/metálico ("LUCAS FRANCO"), tipografia angular na
  parte de cima e uma variante mais fina embaixo — reforça a leitura "equipamento
  de DJ" (cromado, reflexos).
- **Fotos**: estética de estúdio, fundo escuro, luz de gel vermelha de um lado e
  azul do outro (clássico da cena de festa/balada), jaqueta de couro preta,
  óculos escuros, corrente e crucifixo prateados, controlador Denon DJ SC Live 4
  em destaque em várias fotos. Clima: confiante, discreto, "antes do show".
- Nada de rosto/identidade foi alterado — só recorte, `object-position` e
  overlays de gradiente para dar legibilidade ao texto por cima.

## 2. Paleta extraída (`src/styles/tokens.css`)

| Token | Valor | Uso |
|---|---|---|
| `--color-background` | `#08090c` | fundo base |
| `--color-background-secondary` | `#100f14` | seções alternadas |
| `--color-red` | `#ff2d3f` | glow / destaque (gel vermelho das fotos) |
| `--color-blue` | `#1fa2ff` | glow / destaque (gel azul das fotos) |
| `--color-text` | `#f3f2f4` | texto principal |
| `--color-muted` | `#93909c` | texto secundário |
| `--color-chrome` | `#b4b0bc` | acabamento metálico (ecoa a logo) |
| `--color-whatsapp` | `#25d366` | só no botão flutuante, p/ reconhecimento imediato |

**Tipografia** (self-hosted via `@fontsource`, sem depender de CDN externa):
- **Syne** (700/800) — títulos, headline da hero. Geométrica e um pouco
  irregular, evita o "bold genérico".
- **Space Mono** — eyebrows, nav, labels, números. Referência direta aos
  displays digitais da mesa de som.
- **Manrope** — corpo de texto, legível e neutra.

## 3. Conceito criativo

**"Antes do drop"** — a tensão de segundos antes a música explodir. A hero não
abre com um parágrafo institucional: abre com a foto, o nome e um botão. O anel
giratório (inspirado no jog wheel do controlador) e o equalizador animado
aparecem como elementos recorrentes ao longo do site — é a "assinatura visual"
que costura hero, rodapé e chamada final.

## 4. Arquitetura / estrutura de pastas

```
src/
  assets/images/       fotos (webp + jpg) e logo, já otimizadas
  components/          um componente por pasta (JSX + CSS colocalizados)
  data/djData.js        TODO o conteúdo editável do site
  hooks/                useLenis, useScrollReveal, useActiveSection, useMagnetic, useIsMobile...
  styles/               tokens.css (design tokens) + base.css (reset) + mobile-shared.css
  utils/                whatsapp.js (monta os links wa.me), iconMap.js
  App.jsx               decide entre DesktopExperience e MobileExperience (breakpoint 700px)
  DesktopExperience.jsx  página única e contínua (> 700px) — o site "original" do briefing
  MobileExperience.jsx   experiência por rotas (≤ 700px) — ver seção 4.1
  main.jsx
```

Pequeno desvio do esqueleto sugerido no briefing: adicionei as pastas
`Events/` (seção "Outros eventos") e `FinalCTA/` (chamada final), que o
briefing pede como seções mas não listava como pastas — e usei CSS simples
colocalizado por componente em vez de CSS Modules (o briefing permitia
qualquer uma das duas abordagens): mais fácil de editar sem entender hashing
de classes, o que ajuda bastante enquanto você ainda está pegando ritmo com
CSS/JS no dia a dia.

### 4.1 Experiência mobile (≤ 700px) — por rotas

Acima de 700px o site é a página única contínua descrita no briefing original
(`DesktopExperience`). Em telas de até 700px, o `App.jsx` troca para
`MobileExperience`, que usa **React Router** com 4 rotas independentes —
cada uma com composição, ritmo e conteúdo próprios:

| Rota | Tela | Componente |
|---|---|---|
| `/` | Contrate — tela fixa, sem rolagem, `100dvh` | `MobileHome` |
| `/sobre` | Sobre — bio, números, estilos, regiões, redes | `MobileSobre` |
| `/casamentos` | Casamentos — abertura, slider de relatos (swipe), fotos/vídeos em scroll, chamada final | `MobileCasamentos` |
| `/eventos` | Eventos em geral — capas expansíveis por categoria + galeria em scroll | `MobileEventos` |

Navegação entre modalidades: barra inferior fixa (`MobileNav`, não são tabs
genéricas — indicador ativo desliza com Framer Motion). Cada rota entra com
uma transição em painéis vermelho/azul (`PageShutter`, CSS puro, sem custo de
JS) simulando abertura de luzes de show.

**Como o app decide qual experiência mostrar**: `useIsMobile(700)` usa
`matchMedia` e reage a resize/rotação — então girar um tablet ou redimensionar
a janela troca a árvore de componentes corretamente, não só o CSS.

**Vídeo nos casamentos**: o briefing pede vídeos verticais/horizontais na
seção de casamentos, mas não recebi nenhum arquivo de vídeo — hoje
`weddings.media` em `djData.js` usa só fotos. O componente `MediaScroll` já
está pronto para vídeo (`type: "video"`, `muted`, `playsInline`,
`preload="metadata"`, toca só quando visível, botão de som manual): quando
tiver os vídeos reais, é só trocar o `type` e apontar `src`/`poster`.

**Hospedagem**: como agora existem rotas de verdade (`/sobre`, `/casamentos`,
`/eventos`), o host precisa redirecionar qualquer caminho para `index.html`
(comportamento padrão de SPA) — senão dar F5 em `/casamentos` retorna 404.
Já incluí `public/_redirects` (Netlify) e `vercel.json` (Vercel) prontos;
para outro host, é só replicar essa regra na configuração dele.

## 5. Como instalar e rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera a versão de produção em /dist
npm run preview   # serve o build de produção localmente
```

Testado neste ambiente: `npm install` + `npm run build` rodam limpos, sem
erros ou warnings de dependência.

## 6. Onde entram as imagens

Já estão todas em `src/assets/images/`, redimensionadas (lado maior = 2000px)
e convertidas para **WebP com fallback em JPEG** (o componente `<Photo />`
monta o `<picture>` automaticamente — é só chamar `<Photo name="dj-standing-console" alt="..." />`).
Tamanho total das fotos caiu de ~19MB para ~2,9MB nessa otimização.

Mapeamento atual:
- **Hero**: `dj-standing-console`
- **Sobre**: `dj-portrait-headphones`
- **Casamentos**: `dj-sunglasses-portrait`
- **Outros eventos** (tiles com foto): `dj-holding-controller`, `dj-headphones-both-hands`
- **Chamada final** (fundo, baixa opacidade): `dj-console-detail`
- **Galeria**: todas as 8 fotos, em tamanhos variados

Para trocar ou adicionar fotos: solte o arquivo em `src/assets/images/`
(webp/jpg/png) e referencie pelo nome (sem extensão) em `<Photo name="..." />`
ou em `djData.js` → `gallery.items`.

## 7. Conteúdo editável (`src/data/djData.js`)

Já usei os dados reais que você me passou:
- WhatsApp: `+55 31 98208-5111`
- Instagram: `@djlucasfrancooficial`
- Serviços: casamentos, debutantes de 15 anos, eventos corporativos, formaturas,
  aniversários, festas particulares

**Está marcado com comentário `// EDITAR` no arquivo** (e precisa de confirmação
antes de publicar):
- Cidade/região de atuação (usei "Belo Horizonte e região metropolitana" como
  exemplo)
- Biografia (parágrafos da seção Sobre)
- Estatísticas (anos de estrada, nº de eventos, cidades atendidas, avaliação) —
  hoje são números de exemplo para o layout não ficar vazio
- Depoimentos — **são fictícios**, existem só pra mostrar como o layout de
  depoimentos funciona. Isso está avisado também na tela (abaixo do título da
  seção), não só no código.
- Domínio do site em `index.html` (canonical/OG) e no JSON-LD (schema.org)

## 8. Lista de conteúdos que faltam do cliente

- [ ] Fotos em alta resolução **sem marca d'água** do fotógrafo (algumas fotos
      enviadas têm a marca "LucianoNunes" no canto — ok para preview/aprovação,
      mas confirme com ele o uso das versões finais antes de publicar)
- [ ] Biografia real (2 parágrafos já estruturados, é só substituir o texto)
- [ ] Números reais de anos de experiência / eventos / cidades atendidas
- [ ] Estilos musicais e regiões atendidas reais (usados na tela Sobre do mobile)
- [ ] Depoimentos reais de clientes (nome, tipo de evento, frase)
- [ ] Relatos reais de noivos para o slider de Casamentos (nome do casal,
      cidade, relato, avaliação — foto do casal é opcional, o slider funciona
      sem ela)
- [ ] Fotos e, se possível, vídeos verticais/horizontais reais de casamentos
      (pista, noivos dançando, DJ trabalhando) para a experiência de scroll
      de Casamentos no mobile — hoje usa fotos de estúdio do DJ como espaço
      reservado
- [ ] Cidade/região real de atuação
- [ ] Domínio definitivo (para meta tags e schema.org)
- [ ] Se quiser, fotos de eventos reais para reforçar a Galeria

## 9. O que foi implementado (e o que ficou simplificado)

O briefing original tem uma lista muito extensa de microanimações — implementei
um conjunto curado que cobre a identidade pedida sem virar um site pesado ou
"AI genérico":

**Implementado**: hero com entrada em camadas (GSAP), parallax por mouse,
anel giratório + equalizador animado, botão CTA magnético com glow tipo batida
e reflexo no hover, header com blur ao rolar + indicador de seção ativa + barra
de progresso, menu mobile em tela cheia com abertura em painéis (não é
hambúrguer genérico), contadores animados na seção Sobre, cards estilo canal de
mesa de som nos Serviços, galeria editorial com máscara de revelação + lightbox
com navegação por teclado/gesto, depoimentos em marquee horizontal, linha do
processo de contratação animada via scroll (GSAP ScrollTrigger + scrub), modal
de orçamento que monta a mensagem de WhatsApp automaticamente, pop-up discreto
de disponibilidade após ~55% de rolagem, botão flutuante de WhatsApp, cursor
customizado (desktop), lazy-loading de todas as seções abaixo da dobra e do
modal de orçamento, `prefers-reduced-motion` respeitado em todas as animações.
Abaixo de 700px: experiência inteira por rotas (Contrate/Sobre/Casamentos/
Eventos), tela de Contrate fixa sem rolagem, navegação inferior com indicador
deslizante, transição em painéis a cada troca de rota, slider de relatos por
swipe com autoplay que pausa na interação, experiência de scroll com fotos/
vídeo (vídeo já suportado no componente) e capas de evento expansíveis.

**Não implementado** (ficam como sugestão de próxima etapa, se fizer sentido):
- Parallax por giroscópio no mobile (exige pedido de permissão específico no
  iOS e tende a ser instável entre aparelhos — recomendo tratar como um
  incremento futuro, testado nos celulares reais do DJ)
- Efeito sonoro opcional no clique (fácil de adicionar depois, mas som embutido
  é sensível — preferi não incluir sem alinhar com vocês o clipe/volume)
- Fontes: SplitText por linha usa quebra manual (não a extensão paga do GSAP),
  então textos muito compridos podem quebrar em pontos menos "editoriais" —
  funciona bem para os textos atuais
- Vídeos reais na experiência de scroll de Casamentos (ver seção 4.1) — o
  componente já suporta, só falta o material

## 10. Performance

- Bundle inicial: **~175KB gziped** (JS) — subiu um pouco em relação à versão
  anterior porque o React Router agora entra no pacote crítico (necessário
  para decidir a rota logo de cara), mas todas as seções abaixo da dobra, o
  modal de orçamento e as telas Sobre/Casamentos/Eventos do mobile continuam
  carregando sob demanda (`React.lazy`/`Suspense`), cada uma em um chunk
  separado.
- Ícones do lucide-react importados nomeados (não o pacote inteiro) — permite
  tree-shaking de verdade.
- Imagens em WebP com fallback JPEG, dimensionadas para no máximo 2000px no
  lado maior, `width`/`height` explícitos (evita layout shift), `loading="lazy"`
  em tudo que não é a hero.
- Fontes self-hosted via `@fontsource` (sem chamada externa a fontes do Google).

Se quiser espremer ainda mais o JS: o Framer Motion (usado no menu mobile,
nos modais e na tabbar mobile) é a maior fatia depois do React — dá pra
trocar essas animações por CSS puro no futuro, se o peso do bundle virar
prioridade.

**Sobre o `npm audit`**: ele acusa 1 vulnerabilidade "high" no `react-router`
(GHSA-qwww-vcr4-c8h2), mas ela é específica do **modo RSC** (React Server
Components / server actions) do React Router — recurso que este projeto não
usa em nenhum momento (é um SPA 100% client-side, sem servidor). Fica
registrado aqui para não gerar susto ao rodar `npm audit`; vale só ficar de
olho em atualizações futuras do pacote.

## 11. Antes de publicar

- [ ] Rodar o Lighthouse no ambiente final (com domínio real e HTTPS)
- [ ] Revisar todos os `// EDITAR` em `djData.js` e no `index.html`
- [ ] Confirmar direitos de uso das fotos com o fotógrafo (marca d'água)
- [ ] Testar o formulário de orçamento e o botão flutuante em um celular real
      (o link `wa.me` abre o app do WhatsApp diretamente em iOS/Android)
- [ ] Conferir o site nas larguras 320/360/375/390/412/430/600/700px (mobile
      por rotas) e 768/1024/1280/1440px (desktop contínuo)
- [ ] Testar o swipe do slider de relatos e a rolagem de fotos/vídeo em um
      iPhone e em um Android reais
- [ ] Configurar o redirecionamento de SPA no host escolhido (`_redirects` já
      pronto para Netlify, `vercel.json` já pronto para Vercel — outro host
      precisa da mesma regra: qualquer rota cai em `index.html`)

---

Desenvolvido com React 19, Vite, React Router, GSAP + ScrollTrigger, Framer
Motion, Lenis e lucide-react.
