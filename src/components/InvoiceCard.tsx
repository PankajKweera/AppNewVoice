import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button } from "react-native-paper";

const InvoiceCard = ({ inv, index, onEdit }) => (
  <Card style={styles.card}>
    <Card.Content>
      <Text style={styles.title}>Invoice #{index + 1}</Text>
      <View style={styles.row}><Text style={styles.label}>Quantity:</Text><Text style={styles.value}>{inv.qty}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Price:</Text><Text style={styles.value}>₹{inv.price}</Text></View>
      <View style={styles.row}><Text style={styles.label}>Discount:</Text><Text style={styles.value}>₹{inv.discount} ({inv.discountPercent}%)</Text></View>
      <View style={styles.row}><Text style={styles.label}>Tax:</Text><Text style={styles.value}>₹{inv.tax} ({inv.taxPercent}%)</Text></View>
      <View style={styles.row}><Text style={styles.label}>Total:</Text><Text style={styles.value}>₹{inv.tax} ({inv.taxPercent}%)</Text></View>
      <Button
        mode="outlined"
        onPress={() => onEdit(index)}
        style={{ marginTop: 8 }}
        textColor="#007bff"
      >
        Edit
      </Button>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  label: {
    fontWeight: "600",
  },
  value: {
    fontWeight: "400",
  }
});

export default InvoiceCard;
