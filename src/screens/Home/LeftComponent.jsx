import React, { useContext } from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { ModalContext } from '../../context/ModalContext'

const StyledLeftComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    height: 100vh;
    background-color: #f7f9fb;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px){
        position: relative;
        width: 100%;
    }
`
const ContentContainer = styled.div`
    text-align: center;
`

const Logo = styled.img`
    width: 165px;
    margin-bottom: 1rem;
`

const MainHeading = styled.h1`
    font-size: 2.5rem;
    font-weight: 400;
    color: #0f1724;
    margin-bottom: 0.75rem;

    span{
        font-weight: 700;
    }
`
const SubHeading = styled.div`
    font-size: 1.5rem;
    color: #334155;
    opacity: 0.9;
    margin-bottom: 1.5rem;
`

const AddNewButton = styled.button`
    padding: 0.25rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 30px;
    box-shadow: 0px 6px 18px rgba(15,23,36,0.06);
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: all 0.2s ease-in-out;
    background: #0077cc;
    color: #fff;
    span{
        font-size: 2rem;
        font-weight: 700;
    }

    &:hover{
        cursor: pointer;
        transform: scale(1.05);
        box-shadow: 0px 8px 22px rgba(15,23,36,0.08);
    }
`
const LeftComponent = () => {
    const { openModal } = useContext(ModalContext);
    return (
        <StyledLeftComponent>
            <ContentContainer>
                <Logo src={logo} alt="" />
                <MainHeading> <span>CODE</span> HERE</MainHeading>
                {/* <SubHeading></SubHeading> */}
                <AddNewButton onClick={() => openModal({
                    show: true,
                    modalType: 3,
                    identifiers: {
                        folderId: "",
                        cardId: "",
                    }
                })} ><span>+</span> START PROGRAMMING</AddNewButton>
            </ContentContainer>
        </StyledLeftComponent>
    )
}

export default LeftComponent