const { knex } = require('./connection');

const {
  SUBSCRIPTION_TABLE,
  COURSE_TABLE,
  PAYMENT_TABLE,
  PAYMENT_TYPE,
  PAYMENT_METHOD,
  LOCATION_TABLE,
  DISCIPLINE_TABLE,
  SUBSCRIPTION_COURSE_TABLE,
  SUBSCRIPTION_PAYMENT_TABLE,
} = require('./helpers/constants');

const {
  subscriptionToDomain,
  subscriptionWithCoursesToDomain,
  subscriptionWithPaymentsToDomain,
} = require('./helpers/mapDatabaseEntries');

// Get one subscription by Id
const getOneById = async (subscriptionId) => {
  try {
    const rows = await knex(SUBSCRIPTION_TABLE).select().where({ id: subscriptionId });

    const subscription = rows.map(subscriptionToDomain)[0];

    return subscription || null;
  } catch (error) {
    console.log(error);

    return { message: 'TODO' };
  }
};

const getOneWithCoursesByMemberId = async (subscriptionId, memberId) => {
  try {
    const rows = await knex
      .select(
        's.id',
        's.start_date',
        's.end_date',
        's.is_member_retired',
        'c.course_name',
        'd.discipline_name',
        'l.location_name'
      )
      .from(`${SUBSCRIPTION_TABLE} as s`)
      .innerJoin('subscription_course as sc', 's.id', 'sc.fk_subscription_id')
      .innerJoin(`${COURSE_TABLE} as c`, 'c.id', 'sc.fk_course_id')
      .innerJoin(`${DISCIPLINE_TABLE} as d`, 'd.id', 'c.fk_discipline_id')
      .innerJoin(`${LOCATION_TABLE} as l`, 'l.id', 'c.fk_location_id')
      .where({
        's.fk_member_id': memberId,
        's.id': subscriptionId,
      });

    const subscriptionWithCourses = rows.map(subscriptionWithCoursesToDomain);

    return subscriptionWithCourses || [];
  } catch (error) {
    console.log(error);

    return { message: 'TODO' };
  }
};

// Get many subscription with courses by member Id (join discipline and location too) -> exclude archived ones.
const getMemberSubscriptionsWithCoursesDetails = async (memberId) => {
  try {
    const rows = await knex
      .select(
        's.id',
        's.start_date',
        's.end_date',
        's.is_member_retired',
        'c.course_name',
        'd.discipline_name',
        'l.location_name'
      )
      .from(`${SUBSCRIPTION_TABLE} as s`)
      .innerJoin(`${SUBSCRIPTION_COURSE_TABLE} as sc`, 's.id', 'sc.fk_subscription_id')
      .innerJoin(`${COURSE_TABLE} as c`, 'c.id', 'sc.fk_course_id')
      .innerJoin(`${DISCIPLINE_TABLE} as d`, 'd.id', 'c.fk_discipline_id')
      .innerJoin(`${LOCATION_TABLE} as l`, 'l.id', 'c.fk_location_id')
      .where({
        's.fk_member_id': memberId,
      });

    const subscriptionsWithCourses = rows.map(subscriptionWithCoursesToDomain);

    return subscriptionsWithCourses || [];
  } catch (error) {
    console.log(error);

    return { message: 'TODO' };
  }
};

// Get many subscription with payment details (if any) by member Id
const getMemberSubscriptionsWithPaymentDetails = async (memberId) => {
  try {
    const rows = await knex
      .select(
        's.id as subscription_id',
        's.start_date',
        's.end_date',
        's.is_member_retired',
        'p.id as payment_id',
        'p.payment_number',
        'p.payment_date',
        'p.amount_paid',
        'p.include_membership_fee',
        'p.is_shadow',
        'pt.payment_type_name',
        'pm.payment_method_name'
      )
      .from(`${SUBSCRIPTION_TABLE} as s`)
      .innerJoin(`${SUBSCRIPTION_PAYMENT_TABLE} as sp`, 's.id', 'sp.fk_subscription_id')
      .innerJoin(`${PAYMENT_TABLE} as p`, 'p.id', 'sp.fk_payment_id')
      .innerJoin(`${PAYMENT_TYPE} as pt`, 'pt.id', 'p.fk_payment_type_id')
      .innerJoin(`${PAYMENT_METHOD} as pm`, 'pm.id', 'p.fk_payment_method_id')
      .where({
        's.fk_member_id': memberId,
      });

    const subscriptionsWithCourses = rows.map(subscriptionWithPaymentsToDomain);

    return subscriptionsWithCourses || [];
  } catch (error) {
    console.log(error);

    return { message: 'TODO' };
  }
};

// Get many subscription with payment details (if any) by payment type (if it's "Quota" check the field `include_membership_fee`)
const getAllSubscriptionByPaymentType = async (paymentType) => {
  try {
    const rows = await knex
      .select(
        's.id as subscription_id',
        's.start_date',
        's.end_date',
        's.is_member_retired',
        'p.id as payment_id',
        'p.payment_number',
        'p.payment_date',
        'p.amount_paid',
        'p.include_membership_fee',
        'p.is_shadow',
        'pt.payment_type_name',
        'pm.payment_method_name'
      )
      .from(`${SUBSCRIPTION_TABLE} as s`)
      .innerJoin(`${SUBSCRIPTION_PAYMENT_TABLE} as sp`, 's.id', 'sp.fk_subscription_id')
      .innerJoin(`${PAYMENT_TABLE} as p`, 'p.id', 'sp.fk_payment_id')
      .innerJoin(`${PAYMENT_TYPE} as pt`, 'pt.id', 'p.fk_payment_type_id')
      .innerJoin(`${PAYMENT_METHOD} as pm`, 'pm.id', 'p.fk_payment_method_id')
      .where({
        'pt.payment_type_name': paymentType,
      });

    const subscriptionsWithCourses = rows.map(subscriptionWithPaymentsToDomain);

    return subscriptionsWithCourses || [];
  } catch (error) {
    console.log(error);

    return { message: 'TODO' };
  }
};

// ---------------------------------------------------------------------------------------------------------------------------- //

// Create Many Subscription for member by Id (start_date, end_date, courseIds[])
const subscribeMemberToCourses = async (memberId, startDate, endDate, courseIds) => {
  try {
    const rows = await knex(SUBSCRIPTION_TABLE).insert({ fk_member_id: memberId, start_date: startDate, end_date: endDate });

    // Const subscriptionIds = rows.?

    const subscriptionCourse = courseIds.map((courseId) => ({ fk_subscription_id: rows.id, fk_course_id: courseId }));

    const newRows = await knex(SUBSCRIPTION_COURSE_TABLE).insert(subscriptionCourse);

    return null;
  } catch (error) {
    console.log(error);

    return { message: '' };
  }
};

// TODO -> Move `is_member_retired` field to the `subscription_course` table.
// Retire member from !course! -> update `is_member_retired` field
const retireMemberFromCourse = async (subscriptionId, courseId) => {};

// Add One Course to subscription
const addCourseToExistingSubscription = async (subscriptionId, courseId) => {};

// Delete One Course from subscription
const removeCoursesFromExistingSubscription = async (subscriptionId, courseIds) => {};

// ---------------------------------------------------------------------------------------------------------------------------- //

// ---------------------------------------------------------------------------------------------------------------------------- //

module.exports = {
  getOneById,
  getOneWithCoursesByMemberId,
  getMemberSubscriptionsWithCoursesDetails,
  getMemberSubscriptionsWithPaymentDetails,
  getAllSubscriptionByPaymentType,
  subscribeMemberToCourses,
};
