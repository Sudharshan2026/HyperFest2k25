import React from 'react';
import PropTypes from 'prop-types';

const EventFilters = ({ filters, onFilterChange }) => {
    return (
        <div className="event-filters">
            <div className="filter-row">
                <div className="filter-group">
                    <label htmlFor="categoryFilter">Category:</label>
                    <select id="categoryFilter" value={filters.category} onChange={onFilterChange}>
                        <option value="all">All Categories</option>
                        <option value="technical">Technical</option>
                        <option value="cultural">Cultural</option>
                        <option value="sports">Sports</option>
                        <option value="workshop">Workshops</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="dayFilter">Day:</label>
                    <select id="dayFilter" value={filters.day} onChange={onFilterChange}>
                        <option value="all">All Days</option>
                        <option value="day1">Day 1</option>
                        <option value="day2">Day 2</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="deptFilter">Department:</label>
                    <select id="deptFilter" value={filters.dept} onChange={onFilterChange}>
                        <option value="all">All Departments</option>
                        <option value="cse">Computer Science</option>
                        <option value="ece">Electronics</option>
                        <option value="mech">Mechanical</option>
                        <option value="civil">Civil</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

EventFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default EventFilters;