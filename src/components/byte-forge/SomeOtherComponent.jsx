import React from 'react';
import PropTypes from 'prop-types';
import styles from './TeamMember.module.css';

const TeamMember = ({ member }) => {
  return (
    <div className={styles.member}>
      {/* was <a href={member.link}> */}
      <div className={styles.memberLabel}>
        {member.name}
        <div>{member.role}</div>
      </div>
      {/* </a> */}
    </div>
  );
};

TeamMember.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    link: PropTypes.string,
  }).isRequired,
};

export default TeamMember;