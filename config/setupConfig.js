module.exports = {
  autolive: true,
  illegalWords: ['shit', 'fuck'],
  imageDuration: 4,
  posTags: ['NN', 'NNP', 'NNPS', 'NNS'],
  textScrollers: 3,
  visualise: 1,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  tokenAgeMins: 60,
};
