const { knex } = require('./connection');
const { MEMBER_TABLE, SUBSCRIPTION_TABLE } = require('./helpers/constants');
const { getFormattedDate } = require('./helpers/dates');
const { memberToDomain } = require('./helpers/mapDatabaseEntries');
const { studentResponseMessages } = require('./helpers/responses');

const memberToDatabase = (member) => ({
  id: member.id,
  is_adult: member.isAdult,
  tax_code: member.taxCode,
  name: member.Name,
  surname: member.Surname,
  city: member.City,
  address: member.Address,
  phone: member.Phone,
  email: member.Email,
  place_of_birth: member.placeOfBirth,
  subscription_date: getFormattedDate(member.subscriptionDate),
  certificate_expiry_date: getFormattedDate(member.certificateExpiryDate),
  dob: getFormattedDate(member.DOB),
  parent_tax_code: member.parentTaxCode,
  parent_name: member.parentName,
  parent_surname: member.parentSurname,
});

const getOneById = async (id) => {
  try {
    const rows = await knex(MEMBER_TABLE).select().where({ id });

    const member = rows.map(memberToDomain)[0];

    return member || null;
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.getSingle };
  }
};

const getOneByTaxCode = async (taxCode) => {
  try {
    const rows = await knex(MEMBER_TABLE).select().where({ tax_code: taxCode });

    const member = rows.map(memberToDomain)[0];

    return member || null;
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.getSingle };
  }
};

const getMany = async () => {
  try {
    const rows = await knex(MEMBER_TABLE).select();

    const members = rows.map(memberToDomain);

    return members;
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.getMultiple };
  }
};

const createOne = async (member) => {
  try {
    if (!member.taxCode) {
      throw Error('Tax Code missing');
    }

    const newMember = memberToDatabase(member);

    const newMemberID = await knex(MEMBER_TABLE).insert(newMember);

    // TODO: Return the whole row?

    return { id: newMemberID[0], message: studentResponseMessages.ok.create };
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.create };
  }
};

const updateOne = async (member) => {
  try {
    const memberToUpdate = memberToDatabase(member);

    const response = await knex(MEMBER_TABLE).where({ id: member.id }).update(memberToUpdate);

    // TODO: Return updated member?

    return { message: studentResponseMessages.ok.update };
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.update };
  }
};

const updateRegistrationDate = async (id, subscriptionDate) => {
  try {
    const response = await knex(MEMBER_TABLE)
      .where({ id })
      .update({ subscription_date: getFormattedDate(subscriptionDate) });

    // TODO: Return updated member?

    return { message: studentResponseMessages.ok.updateRegistration };
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.updateRegistration };
  }
};

const deleteOne = async (id) => {
  try {
    const memberDeleteResponse = await knex(MEMBER_TABLE).where({ id }).del();

    // TODO: Make sure this deletes on cascade rows from `subscription_course` and `subscription_payment`
    const response = await knex(SUBSCRIPTION_TABLE).where({ fk_member_id: id }).del();

    return { message: studentResponseMessages.ok.delete };
  } catch (error) {
    console.log(error);

    return { message: studentResponseMessages.error.delete };
  }
};

module.exports = {
  getMany,
  getOneByTaxCode,
  getOneById,
  createOne,
  updateOne,
  updateRegistrationDate,
  deleteOne,
};
