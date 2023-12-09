import React, { ReactNode } from 'react'
import HeaderComponent from '../header/page'
import Footer from '../footer/page'
import './page.scss'
import { DataApi } from '@/app/api/login'
import HeaderComponent2 from '../header2/page'
interface ContainerComponent2Props {
    children: ReactNode
    dataLoginApi?: DataApi
}
const ContainerComponent2 = ({ children }: ContainerComponent2Props) => {
    return (
        <React.Fragment>
            <HeaderComponent2 />
            <div className="wrapp-container2">
                {
                    children
                }

            </div>
            <Footer />
        </React.Fragment>
    )
}

export default ContainerComponent2