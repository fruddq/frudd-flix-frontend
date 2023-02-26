import { render } from '@testing-library/react'
import { describe, it } from 'vitest'

import { Loader } from '../Loader'

describe('Loader component', () => {
  it('renders the loader', ({ expect }) => {
    expect(render(<Loader />).container).toMatchInlineSnapshot(`
      <div>
        <div
          class="loading-container"
        >
          <div
            class="loader"
            data-testid="loader"
          />
        </div>
      </div>
    `)
  })
})