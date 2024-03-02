import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { theme } from '../utils/Styles';
import { AntDesign } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';
const ProfileScreen = () => {
  const { setCurrUser } = useAppContext();
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.profilePic}
          />
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.userName}>Admin</Text>
          <Text style={styles.memberSince}>Member Since: 2 March 2024</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Name:</Text>
          <Text style={styles.detailValue}>Admin</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Member Since:</Text>
          <Text style={styles.detailValue}>2 March 2024</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Health Conditions:</Text>
          <Text style={styles.detailValue}>None</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Health Goals:</Text>
          <Text style={styles.detailValue}>Muscle Gain</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrUser(null)} style={[styles.editButton, {marginTop: 20, backgroundColor:theme.colors.warning, flexDirection:"row", gap:10, justifyContent:"center"}]}>
      <AntDesign name="logout" size={24} color="white"  />  
        <Text style={styles.editButtonText}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 50,
    marginTop:35
  },
  profileContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    
  },
  profileImageContainer: {
    marginRight: 20,
    borderWidth: 5,
    borderRadius: 75,
    borderColor: '#8bd78b',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
  },
  profilePic: {
    width: 130,
    height: 130,
    borderRadius: 75,
  },
  profileTextContainer: {
    justifyContent: 'center',
    right:10
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
  },
  memberSince: {
    color: '#666',
    marginTop: 5,
    marginRight:10
  },
  detailsContainer: {
    backgroundColor: '#f9f9f9',
    padding: 40,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    color:"lightgreen"
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    color: 'green',
  },
  editButton: {
    backgroundColor: '#8bd78b',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProfileScreen;
