import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit';
function SpinnerBox() {
    return (
        <SpinnerContiner>
            <SpinnerInner><Spinner name="line-scale-pulse-out" fadeIn='none' color="purple" /></SpinnerInner>
        </SpinnerContiner>
    )
}

export default SpinnerBox

const SpinnerContiner = styled.div`
    background-color: #f3f3f3;
    height: 100vh;
    display: grid;
    place-items: center;
`
const SpinnerInner = styled.div`
padding: 2rem;
    text-align: center;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 30%);
`

