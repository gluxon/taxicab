import { createSelector } from 'reselect'

export const fetchAssignmentsByDueDate = createSelector(
  state => state.assignments.items,
  assignments => Object.values(assignments).sort((a, b) =>
    (a.dueDate > b.dueDate) ? -1 : 1)
)
