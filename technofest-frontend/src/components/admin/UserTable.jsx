import React from 'react';
import PropTypes from 'prop-types';

const UserTable = ({ users }) => {
    return (
        <div className="table-container">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.full_name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UserTable;