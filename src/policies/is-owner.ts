// src/policies/is-owner.js
export default async (ctx, next) => {
  const { id } = ctx.params;
  const user = ctx.state.user;

  const entity = await strapi.db.query('api::article.article').findOne({
    where: { id },
    populate: { author: true },
  });

  if (!entity) {
    return ctx.notFound('Article non trouvé');
  }

  if (!entity.author || entity.author.id !== user.id) {
    return ctx.unauthorized('Vous ne pouvez modifier ou supprimer que vos propres articles.');
  }

  return next();
};