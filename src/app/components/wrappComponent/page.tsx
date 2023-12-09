import React, { ReactNode } from 'react'
import HeaderComponent from '../header/page'
import Footer from '../footer/page'
import './page.scss'
import { DataApi } from '@/app/api/login'
interface ContainerComponent2Props {
    children: ReactNode
    dataLoginApi?: DataApi
}
const ContainerComponent = ({ children }: ContainerComponent2Props) => {
    return (
        <React.Fragment>
            <HeaderComponent />
            <div className="wrapp-container">
                {
                    children
                }

            </div>
            <Footer />
        </React.Fragment>
    )
}

export default ContainerComponent