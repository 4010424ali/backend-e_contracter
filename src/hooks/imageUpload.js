const path = require('path');
const fs = require('fs');
exports.before = async (request, context) => {
  if (request.method === 'post') {
    const { imageUrl, ...otherParams } = request.payload;

    context.imageUrl = imageUrl;

    return {
      ...request,
      payload: otherParams,
    };
  }

  return request;
};

exports.after = async (request, response, context) => {
  const { record, imageUrl } = context;

  if (record.isValid() && imageUrl) {
    const filePath = path.join(
      'public',
      'uploads',
      record.id.toString(),
      imageUrl.name
    );

    await fs.promises.rename(imageUrl.name, filePath);

    await record.update({ imageUrl: `/${filePath}` });
  }

  return response;
};
