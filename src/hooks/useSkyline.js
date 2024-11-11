import { useContext } from 'react'
import SkylineContext from '../context/SkylineProvider'

const useSkyline = () => {
    return useContext(SkylineContext)
}

export default useSkyline