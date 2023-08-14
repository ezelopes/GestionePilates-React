import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import axios from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { receiptFactory } from '../../../helpers/receipts';
import ReceiptFormFields from '../ReceiptFormFields';
import Translation from '../../common/Translation';
import toastConfig from '../../../commondata/toast.config';

const CreateReceiptForm = ({ student, onCreateCallback }) => {
  const form = useForm({ defaultValues: receiptFactory() });

  const { handleSubmit, reset } = form;

  const { mutateAsync } = useMutation(
    async (newReceipt) =>
      axios.put('/api/receipt/createReceipt', { ...newReceipt, TaxCode: student.TaxCode, StudentID: student.StudentID }),
    {
      onSuccess: (response, variables) => {
        onCreateCallback(variables, response.data.ReceiptID);

        reset();

        toast.success(response.data.message, toastConfig);
      },
      onError: (err) => toast.error(err?.message, toastConfig),
    }
  );

  return (
    <div className="form-wrapper create-receipt-form">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(mutateAsync)}>
          <ReceiptFormFields idPrefix="create" />

          <Button type="submit" variant="success">
            <Translation value="buttons.receipt.createReceipt" />
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

CreateReceiptForm.propTypes = {
  /**
   * Student details for API request.
   */
  student: PropTypes.object.isRequired,
  /**
   * Callback to update data after creation.
   */
  onCreateCallback: PropTypes.func.isRequired,
};

export default CreateReceiptForm;
