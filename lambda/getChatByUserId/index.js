const AWS = require('aws-sdk');
const bucketName = "message-list-test";

exports.handler = async (event, context) => {

    const prefix = `usuarioId_${event.usuarioId}`;
    // const prefix = `usuarioId_d4ca42ae-67de-47f6-bc03-46a89915567f`;

    const s3 = new AWS.S3();

    try {
        // Parâmetros para a solicitação de listObjectsV2
        const params = {
            Bucket: bucketName,
            Prefix: prefix
        };

        const data = await s3.listObjectsV2(params).promise();

        const objects = data.Contents;

        const filesContent = [];

        for (const obj of objects) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: obj.Key
            };

            const objectData = await s3.getObject(getObjectParams).promise();

            const fileContent = objectData.Body.toString('utf-8');
            filesContent.push({
                Key: obj.Key,
                Content: fileContent
            });
        }

        return {
            statusCode: 200,
            body: JSON.stringify(filesContent)
        };
    } catch (err) {
        console.error('Erro ao acessar os arquivos no S3:', err);

        return {
            statusCode: 500,
            body: JSON.stringify('Erro ao acessar os arquivos no S3')
        };
    }
};