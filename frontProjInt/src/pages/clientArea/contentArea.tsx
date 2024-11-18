import { Box} from "@chakra-ui/react";
import HeaderA from "./headerArea";
import Nav from "./nav";
import axios from 'axios';
import Pontos from "./pontos";
import RecentOrder from "./recentOrder";
import Resgate from "./resgate";
import { useEffect, useState } from "react";

interface Menu {
    description: string;
    id: string;
    name: string;
    value: number;
    type: string;
    size: string;
}
interface OrderItem {
    id: string;
    orderId: string;
    menuId: string;
    quantity: number;
    Menu: Menu;
}
interface Revenue {
    date: string;
    value: number;
    status: boolean;
}
interface Order {
    id: string;
    Revenue: Revenue;
    OrderItems: OrderItem[];
}

interface OrderLogEntry {
    Order: Order;
}

interface customerInfo {
    loyalty_points: number;
    idnr: string;
    fullName: string;
    email: string;
    id: string;
    OrderLog: OrderLogEntry[];
}

export default function ContentArea() {

    const [resposta, setResposta] = useState<customerInfo | null>(null);
    const API_URL = 'http://localhost:3000/customer/info'; 
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        if (token) {
            axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setResposta(response.data);
            }).catch(error => {
                console.error('Erro ao obter os dados do cliente:', error);
            });
        }
    }, [token]);


    function ultimosPedidos(resposta: customerInfo) {
        const itens = resposta.OrderLog.slice(-3).map(orderLog =>
            orderLog.Order.OrderItems.map(item => item.Menu.name) 
        );
        const tipos = resposta.OrderLog.slice(-3).map(orderLog =>
            orderLog.Order.OrderItems[0]?.Menu.type || 'default'
        );
        const valores = resposta.OrderLog.slice(-3).map(orderLog =>
            orderLog.Order.OrderItems[0]?.Menu.value 
        );
        return { itens, tipos , valores };
    }
    const { itens, tipos , valores } = resposta ? ultimosPedidos(resposta) : { itens: [], tipos: [], valores:[] };

    function pts() {
        return valores.slice(-3);
    }

   
    return (
        <Box>
            
            <HeaderA/>
            <Nav name={resposta ? resposta.fullName : ''}/>
            <Pontos loyalty_points={resposta ? resposta.loyalty_points : 0}/>
            <RecentOrder ultimosItens={itens} types={tipos} pontos={pts()}/>
            <Resgate/>
        </Box>
    );
}
