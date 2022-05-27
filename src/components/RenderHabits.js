import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import UserContext from "./UserContext";
import axios from "axios";
import trash from "../img/trash.svg"


export default function RenderHabits() {

    const {token} = useContext(UserContext);
    const [habits, setHabits] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        const promise = axios.get(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config
        );
    
        promise.then((response) => {
          setHabits([...response.data]);
          console.log(...response.data);
          console.log(habits);
        });
      }, []);


    return(
        <>{habits.map((habit) => (<Habit name={habit.name} key={habit.id} days={habit.days}  id={habit.id}/> ))}</>
    )
}


function Habit({name, days, id}){
    const {token} = useContext(UserContext);

    const weekDays = [
        { id: 0, letter: 'D' },
        { id: 1, letter: 'S' },
        { id: 2, letter: 'T' },
        { id: 3, letter: 'Q' },
        { id: 4, letter: 'Q' },
        { id: 5, letter: 'S' },
        { id: 6, letter: 'S' }
    ]

    function eachDay (props){

        return(
            <Weekdays key={props.id} style={days.includes(props.id) ? {backgroundColor: "#CFCFCF", color:"#FFFFFF"}: {}} > {props.letter} </Weekdays>
        )
    }
    

    function deleteHabit(id) {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
      const promise = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        config
      );

      promise.then((response) => {
        console.log('deletado')
      });
      promise.catch((error) => {});
      console.log('error')

  }


    return (
        <Habits>
            <p>{name}</p>
            <Box >
                {weekDays.map(eachDay)}
            </Box>
            <span className="trash"><img src={trash} alt="trash-icon" onClick={() => deleteHabit(id)} ></img></span>
        </Habits>
    )
}




const Box = styled.div`
    margin-left: 10px;
    display: flex;
`

const Weekdays = styled.div`
    width: 30px;
    height: 30px;
    margin: 3px;
    border: 1px solid #D5D5D5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    color: #d5d5d5;
    font-family: 'Lexend Deca';
    
    color: #d5d5d5;
    background-color: #FFFFFF;

    div{
        display: flex;
    }

`

const Habits = styled.div`
    width: 340px;
    height: 91px;
    background-color: #FFFFFF;
    margin-top: 20px;
    border-radius: 5px;
    font-family: 'Lexend Deca';
    position: relative;

    p{
        color: #666666;
        margin: 10px;
    }

    .trash{
        position: absolute;
        top:0;
        right:0;

        img{
            width: 20px;
            height: 20px;
            margin: 10px
        }
    }
`
