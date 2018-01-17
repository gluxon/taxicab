import { createSelector } from 'reselect'

export const getAssignmentsByDueDate = createSelector(
  state => state.assignments.items,
  assignments => Object.values(assignments).sort((a, b) =>
    (a.dueDate > b.dueDate) ? -1 : 1)
)

export const makeGetSortedAssignmentSubmissions = () =>
  createSelector(
    (state, assignmentId) => state.assignments.items[assignmentId],
    // This selector well optimized. Ideally, we'd like to memoize by the
    // assignment.submissions, but we need state.submissions to get the full
    // copy of submission. This means if a new submission that isn't related
    // to our relevant assignment is added, we'll have to recompute.
    //
    // Not sure if there's a way for reselect to memoize and compute data
    // separately.
    state => state.submissions.items,
    (assignment, submissions) =>
      [...((assignment || {}).submissions || [])]
        .map(id => submissions[id])
        .sort((a, b) => a.id > b.id ? -1 : 1)
  )

export const makeGetSortedSubmissionResults = () =>
  createSelector(
    (state, submissionId) => state.submissions.items[submissionId],
    state => state.results.items,
    (submission, results) =>
      [...(submission.results || [])]
        .map(id => results[id])
  )
