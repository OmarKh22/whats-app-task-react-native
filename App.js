import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

export default function App() {

  const initialChats = [
    {
      id: "1",
      name: "Ahmed Ali",
      message: "Hey, are you coming tonight?",
      time: "12:45 PM",
      unreadCount: 2,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "2",
      name: "Sara Mostafa",
      message: "Sent you the file.",
      time: "11:30 AM",
      unreadCount: 0,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: "3",
      name: "yousefff",
      message: "Ok, see you!",
      time: "Yesterday",
      unreadCount: 5,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: "4",
      name: "Omar Khaled",
      message: "Ok, see you!",
      time: "Yesterday",
      unreadCount: 2,
      avatar: require("./assets/OMAR.jpg"),
    },
    {
      id: "5",
      name: "Ayyaa",
      message: "Sent you the file.",
      time: "11:30 AM",
      unreadCount: 0,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: "6",
      name: "Ali Khaled",
      message: "Ok, see you!",
      time: "Yesterday",
      unreadCount: 2,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: "7",
      name: "Mohamed",
      message: "Ok, see you!",
      time: "Yesterday",
      unreadCount: 2,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  // const statusList = [
  //   { id: "1", name: "Ahmed Ali", time: "Today, 10:00 AM" },
  //   { id: "2", name: "Sara Mostafa", time: "Yesterday, 9:00 PM" },
  // ];

  // const callsList = [
  //   { id: "1", name: "Ahmed Ali", type: "Incoming", time: "Today, 2:00 PM" },
  //   {
  //     id: "2",
  //     name: "Sara Mostafa",
  //     type: "Missed",
  //     time: "Yesterday, 3:00 PM",
  //   },
  // ];

  const [chats, setChats] = useState(initialChats);
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("Chats");

  const handleDelete = (chatId) => {
    Alert.alert("Delete Chat", "Are you sure you want to delete this chat?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setChats((prev) =>
            prev.map((chat) =>
              chat.id === chatId
                ? { ...chat, message: "This chat was deleted", unreadCount: 0 }
                : chat
            )
          );
        },
      },
    ]);
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderChatItem = ({ item }) => (
    <Pressable
      onLongPress={() => handleDelete(item.id)}
      style={styles.chatItem}
    >
      <Image
        source={
          typeof item.avatar === "number" ? item.avatar : { uri: item.avatar }
        }
        style={styles.avatar}
      />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text
            style={[
              styles.chatMessage,
              item.message === "This chat was deleted" && styles.deletedMsg,
            ]}
          >
            {item.message}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Chats":
        return (
          <FlatList
            data={filteredChats}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
            contentContainerStyle={styles.chatList}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WhatsApp</Text>
        <View style={styles.headerIcons}>
          <Ionicons
            name="camera-outline"
            size={22}
            color="#fff"
            style={styles.icon}
          />
          <Ionicons
            name={searchActive ? "close" : "search"}
            size={22}
            color="#fff"
            style={styles.icon}
            onPress={() => {
              setSearchActive(!searchActive);
              setSearchText("");
            }}
          />
          <Entypo
            name="dots-three-vertical"
            size={18}
            color="#fff"
            style={styles.icon}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["Chats", "Status", "Calls"].map((tab) => (
          <TouchableOpacity
            key={tab}
            // onPress={() => setActiveTab(tab)}
            style={styles.tabButton}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.tabActive]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search */}
      {searchActive && activeTab === "Chats" && (
        <TextInput
          placeholder="Search chats..."
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      )}
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101d25" },
  header: {
    backgroundColor: "#075E54",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 22, color: "#fff", fontWeight: "bold" },
  headerIcons: { flexDirection: "row" },
  icon: { marginLeft: 18 },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#075E54",
    paddingVertical: 10,
  },
  tabButton: { paddingHorizontal: 10 },
  tabText: { color: "#ccc", fontSize: 14, fontWeight: "600" },
  tabActive: { color: "#fff", borderBottomWidth: 2, borderBottomColor: "#fff" },
  searchInput: {
    backgroundColor: "#1f2c34",
    color: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  chatList: { padding: 10 },
  chatItem: {
    flexDirection: "row",
    backgroundColor: "#121b22",
    padding: 10,
    marginBottom: 8,
    borderRadius: 10,
  },
  avatar: { width: 55, height: 55, borderRadius: 30, marginRight: 10 },
  chatContent: { flex: 1 },
  chatHeader: { flexDirection: "row", justifyContent: "space-between" },
  chatName: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  chatTime: { color: "#aaa", fontSize: 12 },
  chatFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  chatMessage: { color: "#bbb", fontSize: 14, flex: 1 },
  deletedMsg: { fontStyle: "italic", color: "#777" },
  unreadBadge: {
    backgroundColor: "#25D366",
    minWidth: 22,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  unreadText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121b22",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
});
