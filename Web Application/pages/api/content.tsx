import fs from 'fs';

const content = (req, res) => {
  if (req.method == 'GET') {
    const text = fs.readFileSync('./animals.json', 'utf-8');
    return res.status(200).send(text);
  }

  if (req.method == 'POST') {
    try {
      fs.writeFileSync('./animals.json', JSON.stringify(req.body));
    } catch (error) {
      return res.status(400).send({ status: 'not ok' });
    }
    return res.status(200).send({ status: 'ok' });
  }
};

export default content;
