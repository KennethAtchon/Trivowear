import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Accordion = ({ description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="font-semibold">Description</div>
        <div className="text-gray-600">{isOpen ? '-' : '+'}</div>
      </div>
      {isOpen && (
        <div className="p-4 border-gray-200">
          <p className="text-gray-700 break-all">{description}</p>
        </div>
      )}
    </div>
  );
};

Accordion.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Accordion;
