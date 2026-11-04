(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !motion.matches) {
    document.documentElement.classList.add('js-reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) {e.target.classList.add('visible');observer.unobserve(e.target);} }), {threshold:.08});
    $$('.reveal').forEach(el => observer.observe(el));
  }
  const menu = $('.menu');
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');$('#nav-links').classList.toggle('open',open); });
  $$('#nav-links a').forEach(a => a.addEventListener('click', () => {menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');$('#nav-links').classList.remove('open');}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && menu?.getAttribute('aria-expanded')==='true'){menu.click();menu.focus();}});
  function activateTab(button) { $$('[data-tab]').forEach(b => { const active=b===button;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;$('#panel-'+b.dataset.tab).hidden=!active;}); }
  $$('[data-tab]').forEach((b,i,buttons) => {b.addEventListener('click',()=>activateTab(b));b.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%buttons.length;if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+buttons.length-1)%buttons.length;if(e.key==='Home')next=0;if(e.key==='End')next=buttons.length-1;if(next!==undefined){e.preventDefault();activateTab(buttons[next]);buttons[next].focus();}});});
  const charts = {
    7:{path:'M0 145L58 132L116 151L175 109L233 115L292 64L350 76L408 102L466 79L525 87L583 42L641 61L700 53',y:53,result:'+ US$ 80<span>,00</span>',count:'12'},
    30:{path:'M0 45L35 32L70 64L105 55L140 83L175 68L210 99L245 78L280 123L315 110L350 154L385 140L420 158L455 125L490 139L525 106L560 124L595 98L630 119L665 109L700 118',y:118,result:'− US$ 120<span>,00</span>',count:'48'}
  };
  $$('[data-period]').forEach(b=>b.addEventListener('click',()=>{const c=charts[b.dataset.period];$$('[data-period]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});$('#chart-line').setAttribute('d',c.path);$('#chart-area').setAttribute('d',c.path+'V200H0Z');$('#chart-dot').setAttribute('cy',String(c.y));$('#demo-result').innerHTML=c.result;$('#demo-result').style.color=b.dataset.period==='30'?'#e9b4a6':'#b0d9bc';$('#demo-count').textContent=c.count;$('#chart-title').textContent=`Saldo ilustrativo nos últimos ${b.dataset.period} dias, com altas e baixas. Não representa resultado real.`;}));
  const money = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'USD'});
  $('#risk-range')?.addEventListener('input', e=>{const percent=Number(e.target.value)/10;$('#risk-percent').textContent=percent.toLocaleString('pt-BR',{maximumFractionDigits:1})+'%';$('#risk-amount').textContent=money.format(10000*percent/100);});
  const contents = {
    aluno:['Seu ambiente de aprendizado.', '<p>A infraestrutura atual continua no Black Wolf. Escolha o ambiente que você já utiliza.</p><div class="dialog-links"><a href="https://painel.blackwolfea.com" target="_blank" rel="noopener noreferrer">Abrir painel do robô ↗</a><a href="https://curso.blackwolfea.com" target="_blank" rel="noopener noreferrer">Abrir área de aulas ↗</a></div><p>Esta demonstração ORVENTO não cria uma conta nem altera seu acesso atual.</p>'],
    essencial:['Uma base para começar.', '<p>Proposta Essencial: conteúdo introdutório em português, fundamentos do operacional e gerenciamento de risco na área de aprendizado.</p><p>Preço em reais, prazo de acesso e composição final ainda serão definidos. Esta prévia não realiza vendas.</p>'],
    automacao:['Automação, com acompanhamento.', '<p>Licença para a ferramenta de automação no MetaTrader 5, operacional em XAUUSD, painel de acompanhamento e orientações de instalação.</p><p>Antes do lançamento, serão confirmados preço mensal em reais, quantidade de contas, suporte e requisitos da oferta Brasil. Operações envolvem risco de perda e não têm garantia de rentabilidade.</p>'],
    comunidade:['Mais repertório. Mais contexto.', '<p>Conceito de um produto futuro: curadoria educativa de mercado e troca de experiências, com linguagem acessível e fontes verificáveis.</p><p>Não há uma comunidade ORVENTO ativa nesta prévia. Formato, frequência, preço e responsável pelo conteúdo precisam ser definidos.</p>'],
    'aula-risco':['Gerenciamento de risco.', '<p>Objetivo da trilha proposta: compreender exposição, tamanho de posição, limite de perda e acompanhamento. Gerenciar risco não significa eliminar perdas.</p><p>Esta janela apresenta o tema; não reproduz uma aula. O conteúdo disponível para alunos fica na área atual do curso.</p>'],
    'aula-operacional':['Fundamentos do operacional.', '<p>Entenda o papel da estratégia, dos critérios de entrada e saída e dos diferentes cenários de mercado antes de utilizar uma automação.</p><p>Esta é uma apresentação do tema da trilha, não uma recomendação ou sinal de operação.</p>'],
    'aula-instalacao':['Prepare o ambiente.', '<p>A estrutura atual inclui guias de instalação do MT5 e do robô. A organização desses materiais na edição Brasil será definida antes do lançamento.</p><p>Verifique compatibilidade da conta, regras da corretora ou mesa e custos de computador ou VPS.</p>'],
    privacidade:['Sobre esta prévia.', '<p>Esta página não contém formulário de cadastro, checkout ativo, pixels publicitários ou coleta própria de dados pessoais. Interações demonstrativas acontecem no seu navegador.</p><p>Esta prévia é hospedada na infraestrutura do site Black Wolf. Ao abrir a área de alunos, aplicam-se as condições daquele ambiente.</p><p>As condições comerciais e políticas específicas da operação brasileira serão publicadas antes do início das vendas.</p>']
  };
  const dialog=$('#info-dialog');
  if(dialog){let opener;$$('[data-modal]').forEach(button=>button.addEventListener('click',()=>{const c=contents[button.dataset.modal];if(!c)return;opener=button;$('#dialog-title').textContent=c[0];$('#dialog-body').innerHTML=c[1];dialog.showModal();}));$$('.close-dialog,.dialog-done').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>opener?.focus());}
})();
