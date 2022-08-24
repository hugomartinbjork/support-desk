import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Ticket = () => {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  )
  const dispatch = useDispatch()
  const params = useParams()

  // useEffect(() => {
  //   return () => {
  //     if (isSuccess) {
  //       dispatch(reset())
  //     }
  //   }
  // }, [dispatch, isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getTicket(params.ticketId))
  }, [isError, message, params.ticketId])

  if (isLoading) {
    return <Spinner />
  }

  return <div>hello</div>
}

export default Ticket
