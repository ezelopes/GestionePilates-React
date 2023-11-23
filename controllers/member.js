const { Router } = require('express');
const {
  getMany,
  getOneByTaxCode,
  // GetOneById,
  createOne,
  updateOne,
  updateSubscriptionDate,
  deleteOne,
} = require('../database/member');

const memberRouter = new Router();

const getManyMembers = async (_, res) => {
  try {
    const members = await getMany();

    res.status(200).send(members);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getOneMemberByTaxCode = async (req, res) => {
  try {
    const { taxCode } = req.params;

    if (!taxCode) {
      throw Error('Tax Code missing');
    }

    const member = await getOneByTaxCode(taxCode);

    res.status(200).send(member);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const createOneMember = async (req, res) => {
  try {
    const { id, message } = await createOne(req.body);

    if (!id) {
      return res.status(400).send({ message });
    }

    return res.status(200).send({ id, message });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const updateOneMember = async (req, res) => {
  try {
    const { message } = await updateOne(req.body);

    res.status(200).send({ message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const updateMemberSubscriptionDate = async (req, res) => {
  try {
    const { id, subscriptionDate } = req.body;

    if (!id || !subscriptionDate) {
      return res.status(400).send({ message: 'subscriptionDate Date or member ID missing in the request' });
    }

    const { message } = await updateSubscriptionDate(id, subscriptionDate);

    return res.status(200).send({ message });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.body;
    const { message } = await deleteOne(id);

    res.status(200).send({ message });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

memberRouter.get('/getMembers', getManyMembers);
memberRouter.get('/getMember/:taxCode', getOneMemberByTaxCode);
memberRouter.put('/createMember', createOneMember);
memberRouter.post('/updateMember', updateOneMember);
memberRouter.post('/updateMemberSubscriptionDate', updateMemberSubscriptionDate);
memberRouter.delete('/deleteMember', deleteMember);

module.exports = memberRouter;
