import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../redux/action';

const RenderItem = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.basicInfo}>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.section}>
      <Text style={styles.sectionTitle}>Address</Text>
      <Text style={styles.sectionContent}>
        {item.address.address}, {item.address.city}, {item.address.state}{' '}
        {item.address.postalCode}, {item.address.country}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.section}>
      <Text style={styles.sectionTitle}>Company</Text>
      <Text style={styles.sectionContent}>
        {item.company.title} at {item.company.name}, {item.company.department}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.section}>
      <Text style={styles.sectionTitle}>Crypto</Text>
      <Text style={styles.sectionContent}>
        {item.crypto.coin}: {item.crypto.wallet}
      </Text>
    </TouchableOpacity>
  </View>
);

const UserList = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.reducer);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  return (
    <View>
      <FlatList
        data={data?.userList?.users}
        renderItem={RenderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.container}
      />
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 60,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  basicInfo: {
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  email: {
    color: 'gray',
    flexWrap: 'wrap',
  },
  phone: {
    color: 'gray',
    flexWrap: 'wrap',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionContent: {
    marginLeft: 5,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  sectionText: {
    fontSize: 14,
    flexWrap: 'wrap',
  },
});
