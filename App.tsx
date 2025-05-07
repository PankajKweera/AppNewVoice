import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import InvoiceForm from "./src/components/InvoiceForm";
import InvoiceCard from "./src/components/InvoiceCard";


const initialInvoice = {
  qty: "1",
  price: "0",
  discountPercent: "0",
  discount: "0",
  taxPercent: "0",
  tax: "0",
  total: "0",
};

export default function App() {
  const [invoice, setInvoice] = useState(initialInvoice);
  const [invoices, setInvoices] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = () => {
    const isEditing = editingIndex !== null;
    const updatedInvoices = [...invoices];
    isEditing ? updatedInvoices.splice(editingIndex, 1, invoice) : updatedInvoices.push(invoice);
    setInvoices(updatedInvoices);
    setInvoice(initialInvoice);
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setInvoice(invoices[index]);
    setEditingIndex(index);
  };

  return (
    <ScrollView style={styles.container} >
      <View style={styles.container1}>
        
      <InvoiceForm invoice={invoice} setInvoice={setInvoice} onSubmit={handleSubmit} editing={editingIndex !== null} />
      <View style={styles.grid}>
        {invoices.map((inv, index) => (
          <InvoiceCard key={index} inv={inv} index={index} onEdit={handleEdit} />
        ))}
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
 
  },
  container1: {
   margin:20

  },
  grid: {
    marginTop: 16,
    gap: 12,
  },
});
