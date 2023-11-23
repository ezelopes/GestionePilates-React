const { Router } = require('express');
const { getManyWithCoursesByMemberId } = require('../database/subscription');

const subscriptionRouter = new Router();

const getManyWithCoursesByMemberIdEndpoint = async (req, res) => {
  try {
    const { memberId } = req.params;

    if (!memberId) {
      throw Error('Member ID missing');
    }

    const subscriptionWithCourses = await getManyWithCoursesByMemberId(memberId);

    res.status(200).send(subscriptionWithCourses);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

// GetManyWithCoursesByMemberIdEndpoint -> Between dates
// GetManyWithCoursesByMemberIdEndpoint -> In Academic Year

subscriptionRouter.get('/getSubscriptionWithCourses/:memberId', getManyWithCoursesByMemberIdEndpoint);

module.exports = subscriptionRouter;
