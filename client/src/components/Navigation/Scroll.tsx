import { LinearProgress } from '@material-ui/core'
import React from 'react'
import { scrollProgress } from '../../utils/utils'

const Scroll = () => {
    const [progress, setProgress] = React.useState<number>(0)
    React.useEffect(() => {

        const logicScrol = (): void => {
            scrollProgress(setProgress)
        }

        window.addEventListener('scroll', logicScrol)
        return () => {
            window.removeEventListener('scroll', logicScrol)
        }
    }, [])
    return (
        <LinearProgress variant="determinate" value={progress} />
    )
}

export default Scroll
