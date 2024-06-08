// src/stories/JobPortalModal.stories.js

import React from "react";
import JobPortalModal from "../components/Modal";

export default {
  title: "Components/JobPortalModal",
  component: JobPortalModal,
};

const Template = (args) => <JobPortalModal {...args} />;

export const RegistrationModal = Template.bind({});
RegistrationModal.args = {
  open: true,
  onClose: () => console.log("Modal closed"),
};

export const LoginModal = Template.bind({});
LoginModal.args = {
  open: true,
  onClose: () => console.log("Modal closed"),
};
