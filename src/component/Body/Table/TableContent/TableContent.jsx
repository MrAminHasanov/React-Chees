import c from './TableContent.module.scss'
import Square from './Square/Square'
import { useSelector } from 'react-redux'

function TableContent() {
  const tableStore = useSelector(state => state.squaresList);
  const squeares = tableStore.content;

  return (
    <div className={c.component}>
      {
        Object.values(squeares).map((content, i) => <Square id={i} key={i} figure={content} />)
      }
    </div>
  )
}

export default TableContent