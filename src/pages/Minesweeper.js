import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../constants/constants';

const SIZE = 7;
const MINES = 5;

const generateBoard = () => {
  const board = Array(SIZE)
    .fill()
    .map(() => Array(SIZE).fill(false));

  // Randomly place mines
  for (let i = 0; i < MINES; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * SIZE);
      y = Math.floor(Math.random() * SIZE);
    } while (board[x][y]);
    board[x][y] = true;
  }

  return board;
};

const NearbyMines = (board, x, y) => {
  let count = 0;
  for (let i = Math.max(0, x - 1); i < Math.min(SIZE, x + 2); i++) {
    for (let j = Math.max(0, y - 1); j < Math.min(SIZE, y + 2); j++) {
      if (board[i][j]) {
        count++;
      }
    }
  }
  return count;
};

const Cell = ({revealed, value, onPress}) => (
  <TouchableOpacity
    style={[styles.cell, revealed ? styles.revealed : styles.hidden]}
    onPress={onPress}>
    {revealed && value !== null && <Text style={Fonts.Body}>{value}</Text>}
  </TouchableOpacity>
);

const isWon = (board, revealed) => {
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      if (!revealed[x][y] && !board[x][y]) {
        return false;
      }
    }
  }
  return true;
};

const Minesweeper = () => {
  const [key, setKey] = useState(0);
  const [board, setBoard] = useState(generateBoard());
  const [revealed, setRevealed] = useState(
    Array(SIZE)
      .fill()
      .map(() => Array(SIZE).fill(false)),
  );
  const [isWinner, setIsWinner] = useState(0);
  const [message, setMessage] = useState('');
  const [time, setTime] = useState(60);

  const startNewGame = () => {
    setKey(prevKey => prevKey + 1);
    setBoard(generateBoard());
    setIsWinner(0);
    setRevealed(
      Array(SIZE)
        .fill()
        .map(() => Array(SIZE).fill(false)),
    );
  };

  const revealCell = (x, y) => {
    if (!revealed[x][y]) {
      setRevealed(prevState => {
        if (isWinner === 0) {
          const newState = [...prevState];
          newState[x][y] = true;
          if (board[x][y]) {
            setIsWinner(-1);
            return newState;
          }
          if (isWon(board, newState)) {
            setIsWinner(1);
          }
          return newState;
        } else {
          return prevState;
        }
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevState => prevState - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isWinner === 1) {
      setMessage('Yaay! You Won! 🎉');
    } else if (isWinner === -1) {
      setMessage('Smh! You Lost! 😐');
    } else {
      setMessage('');
    }
  }, [isWinner]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{alignItems: 'center'}}>
      <ActivityIndicator size="large" color={Colors.White} />
      <Text style={[Fonts.Heading1, {margin: 10}]}>Waking up the server</Text>
      <View style={styles.funFact}>
        <Text style={[Fonts.Body, {textAlign: 'center'}]}>
          Just a heads up, this might drag on for up to a minute,{' '}
          <Text style={{fontWeight: 'bold'}}>sorry for that</Text>, so you've
          still got some time to kill:{'\n\n'} Approximately{' '}
          <Text style={{fontWeight: 'bold'}}>{time}s</Text> remaining.{'\n\n'}{' '}
          Meanwhile, you can play a game of Minesweeper 😇
        </Text>
      </View>
      <View style={styles.container}>
        {board.map((row, x) => (
          <View key={x} style={styles.row}>
            {row.map((mine, y) => (
              <Cell
                key={y}
                revealed={revealed[x][y]}
                value={mine ? '💣' : NearbyMines(board, x, y)}
                onPress={() => revealCell(x, y)}
              />
            ))}
          </View>
        ))}
      </View>
      <Text style={[Fonts.Heading2, {marginTop: 10}]}>{message}</Text>
      <TouchableOpacity onPress={startNewGame} style={styles.newGameButton}>
        <Text style={[Fonts.Heading1, {marginTop: 10}]}>New Game</Text>
      </TouchableOpacity>
      <Text style={[Fonts.Body, {textAlign: 'center'}]}>
        {'\n\n'} Fun Fact: You can speed this up by donating 7 USD to upgrade
        the server this app's backend is running on. 🙂
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5755FE',
  },
  hidden: {
    backgroundColor: '#8B93FF',
  },
  funFact: {
    marginVertical: 20,
  },
  revealed: {
    backgroundColor: 'white',
  },
});

export default Minesweeper;
