import {
  onDomainCustomerResponse,
  onGetAllDomainBookings,
} from "@/actions/appointment";
import PortalForm from "@/components/forms/portal/portal-form";
import React from "react";

type Props = { params: { domainid: string; customerid: string } };

const CustomerSignUpForm = async ({ params }: Props) => {
  const questions = await onDomainCustomerResponse(params.customerid);
  const formQuestions = [
    'Spill the tea — what’s this appointment for?" ☕',
    "Got something in mind? Let us know!",
  ];
  const bookings = await onGetAllDomainBookings(params.domainid);

  if (!questions) return null;

  return (
    <PortalForm
      bookings={bookings}
      email={questions.email!}
      domainid={params.domainid}
      customerId={params.customerid}
      questions={formQuestions}
      type="Appointment"
    />
  );
};

export default CustomerSignUpForm;
