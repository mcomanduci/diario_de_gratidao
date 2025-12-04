export const prompts = [
  "O que te fez sorrir hoje?",
  "Quem é alguém que você aprecia e por quê?",
  "Qual foi uma pequena vitória que você teve hoje?",
  "O que você aprendeu de novo recentemente?",
  "Descreva um momento de paz que você teve hoje.",
  "Pelo que você é grato na sua saúde hoje?",
  "Qual é a sua comida favorita e quando foi a última vez que a comeu?",
  "Cite uma música que te traz boas memórias.",
  "O que você gosta no lugar onde mora?",
  "Quem te ajudou recentemente e como?",
  "Qual é uma habilidade que você tem e pela qual é grato?",
  "Descreva um objeto que você usa todos os dias e facilita sua vida.",
  "Qual foi a melhor parte da sua manhã?",
  "Pelo que você está ansioso no futuro próximo?",
  "Qual é um desafio que você superou e te fez mais forte?",
  "Cite um livro ou filme que te inspirou.",
  "O que você gosta na natureza?",
  "Qual é uma memória de infância que te faz feliz?",
  "Pelo que você é grato no seu trabalho ou estudos?",
  "Qual é um elogio que você recebeu e guardou com carinho?",
];

export function getRandomPrompt() {
  return prompts[Math.floor(Math.random() * prompts.length)];
}
