const { Router } = require('express');
const { getMemberSubscriptionsWithCoursesDetails } = require('../database/subscription');

const subscriptionRouter = new Router();

const getMemberSubscriptionsWithCoursesDetailsEndpoint = async (req, res) => {
  try {
    const { memberId } = req.params;

    if (!memberId) {
      throw Error('Member ID missing');
    }

    const subscriptionWithCourses = await getMemberSubscriptionsWithCoursesDetails(memberId);

    res.status(200).send(subscriptionWithCourses);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

// GetMemberSubscriptionsWithCoursesDetailsEndpoint -> Between dates
// GetMemberSubscriptionsWithCoursesDetailsEndpoint -> In Academic Year

subscriptionRouter.get('/getSubscriptionWithCourses/:memberId', getMemberSubscriptionsWithCoursesDetailsEndpoint);

module.exports = subscriptionRouter;
