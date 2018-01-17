import styled from 'styled-components'
import { pure } from 'recompose'
import ResultStatusIndicator from 'components/ResultStatusIndicator'

const Result = ({ result }) =>
  <ResultContainer>
    <header>
      <h1>{result.test.name}</h1>
      {<ResultStatusIndicator passed={result.passed} />}
    </header>
    <div>
      <dl>
        <dt>Submitted Output</dt>
        <dd><pre>{result.functionOutput}<br /></pre></dd>

        <dt>Standard Error</dt>
        <dd>
          <pre>
            {result.stderr.trim().length === 0
              ? 'N/A'
              : result.stderr}
          </pre>
        </dd>
        <dt>Standard Out</dt>
        <dd>
          <pre>{
            result.stdout.trim().length === 0
            ? 'N/A'
            : result.stdout
          }</pre>
        </dd>
      </dl>

      <strong>Function Name</strong>: {result.test.function}<br />
      <strong>Function Arguments</strong>: {result.test.arguments}<br />
      <strong>Assertion (Passing Condition)</strong>: {result.test.code}<br />
    </div>
  </ResultContainer>

export default pure(Result)

const ResultContainer = styled.div`
  position: sticky;
  top: 0;

  header {
    padding: 1em;
    border-bottom: 1px solid rgba(0,0,0, .1);

    display: flex;
    align-items: center;

    i {
      margin: 0 1em;
    }
  }

  pre {
    background-color: rgba(0,0,0, .5);
    color: white;
    padding: 0.5em 1em;
    border-radius: 3px;
  }

  h1 {
    display: inline;
    margin: 0;
  }

  > div {
    padding: 1em;
    display: sticky;
  }
`
