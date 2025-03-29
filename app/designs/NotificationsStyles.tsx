import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const NotificationCard = styled.View`
  background-color: rgba(250, 250, 250, 0.39);
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  flex-direction: row-reverse; /* Place the image on the right */
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px; /* Corrected syntax */
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 2; /* For Android shadow */
`;

export const NotificationTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: rgb(255, 255, 255);
  margin-bottom: 5px;
`;

export const NotificationMessage = styled.Text`
  font-size: 14px;
  color: rgb(255, 254, 254);
  margin-bottom: 10px;
`;

export const NotificationDate = styled.Text`
  font-size: 12px;
  color: rgb(255, 255, 255);
  text-align: right;
`;

export const NotificationImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border: 2px solid #ffffff;
  margin-left: 15px; /* Add spacing between the image and the text */
`;

export const NotificationContent = styled.View`
  flex: 1;
  padding-left:15px;
`;
export const NotificationProgram = styled.Text`
  font-size: 14px;
  color:rgb(230, 230, 230); /* Highlight the program name in red */
  margin-bottom: 5px;
  font-weight: bold;
`;