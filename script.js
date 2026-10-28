/* =====================================================
   SCRIPT.JS - JavaScript do projeto (usa o Bootstrap 5)
   Roda em todas as páginas; cada bloco só funciona
   se encontrar o elemento certo na página.
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. TOOLTIPS do Bootstrap ----------
     Qualquer elemento com data-bs-toggle="tooltip" e title="..." */
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach(function (el) {
    new bootstrap.Tooltip(el);
  });


  /* ---------- 2. EXERCÍCIOS: correção automática ---------- */
  const formQuiz = document.getElementById('formQuiz');

  if (formQuiz) {
    const resultado = document.getElementById('resultado');

    formQuiz.addEventListener('submit', function (evento) {
      evento.preventDefault();               // não recarrega a página

      const questoes = formQuiz.querySelectorAll('.questao');
      let acertos = 0;
      let semResposta = 0;

      questoes.forEach(function (questao) {
        const marcada = questao.querySelector('input[type="radio"]:checked');
        const feedback = questao.querySelector('.feedback');

        if (!marcada) {                       // não respondeu
          semResposta++;
          feedback.textContent = 'Você ainda não respondeu esta questão.';
          feedback.className = 'feedback mt-2 mb-0 text-warning fw-bold';
        } else if (marcada.dataset.correta === 'true') {   // acertou
          acertos++;
          feedback.textContent = '✔ Resposta correta!';
          feedback.className = 'feedback mt-2 mb-0 certo';
        } else {                              // errou
          const certa = questao.querySelector('[data-correta="true"]');
          const textoCerto = questao.querySelector('label[for="' + certa.id + '"]').textContent;
          feedback.textContent = '✘ Errou. A resposta certa é: ' + textoCerto;
          feedback.className = 'feedback mt-2 mb-0 errado';
        }
      });

      if (semResposta > 0) {
        resultado.textContent = 'Responda todas as questões para ver sua nota.';
      } else {
        resultado.textContent = 'Você acertou ' + acertos + ' de ' + questoes.length + ' questões! ' + mensagem(acertos, questoes.length);
      }
      resultado.classList.remove('d-none');
      resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Botão "Refazer": limpa os avisos e o resultado
    formQuiz.addEventListener('reset', function () {
      formQuiz.querySelectorAll('.feedback').forEach(function (f) {
        f.textContent = '';
      });
      resultado.classList.add('d-none');
    });
  }

  function mensagem(acertos, total) {
    if (acertos === total) return 'Parabéns, nota máxima! 🎉';
    if (acertos >= total / 2) return 'Muito bem, continue praticando! 👍';
    return 'Revise os conteúdos e tente de novo. 💪';
  }


  /* ---------- 3. CONTATO: validação do formulário ---------- */
  const formContato = document.getElementById('formContato');

  if (formContato) {
    formContato.addEventListener('submit', function (evento) {
      evento.preventDefault();

      if (!formContato.checkValidity()) {
        formContato.classList.add('was-validated');   // mostra os erros em vermelho
        return;
      }

      const nome = document.getElementById('nome').value;
      document.getElementById('avisoContato').innerHTML =
        '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        'Obrigado, <strong>' + nome + '</strong>! Sua mensagem foi enviada.' +
        '<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>';

      formContato.reset();
      formContato.classList.remove('was-validated');
    });
  }

});
