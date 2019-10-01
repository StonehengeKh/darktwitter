import React, {Component} from "react"

import Header from "../../components/Header"
import "./Layout.css"

class Layout extends Component {
    render() {
        const {children} = this.props
        return (
            <div className="layout-block">
                <div className="layout-block-page">
                    <Header />
                    {children}
                </div>
            </div>
        )
    }
}

export default Layout;