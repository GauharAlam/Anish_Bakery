import { useDispatch } from 'react-redux';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { updateQuantity, removeFromCart } from '../../store/cartSlice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleIncrease = () => {
        dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }));
    };

    const handleDecrease = () => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeFromCart(item._id));
        }
    };

    const handleRemove = () => {
        dispatch(removeFromCart(item._id));
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <img
                src={item.imageURL}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-bakery-brown font-bold">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={handleDecrease}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                >
                    <FiMinus size={18} />
                </button>

                <span className="w-8 text-center font-semibold">{item.quantity}</span>

                <button
                    onClick={handleIncrease}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                >
                    <FiPlus size={18} />
                </button>
            </div>

            <div className="text-right">
                <p className="font-bold text-lg text-bakery-dark">
                    ₹{item.price * item.quantity}
                </p>
                <button
                    onClick={handleRemove}
                    className="text-red-500 hover:text-red-700 mt-1"
                >
                    <FiTrash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
