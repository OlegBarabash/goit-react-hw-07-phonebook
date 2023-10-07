import { useDispatch, useSelector } from 'react-redux';
import { ListItem, List, DeleteBtn } from './ContactList.styled';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import { MdDeleteForever } from 'react-icons/md';

export const ContactList = () => {
  const filter = useSelector(getFilter);
  const { items } = useSelector(getContacts);

  const contArr = items.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  const dispatch = useDispatch();
  const onDelete = id => dispatch(deleteContact(id));

  return (
    <>
      {contArr.length !== 0 ? (
        <List>
          {contArr.map(cont => (
            <ListItem key={cont.id}>
              {cont.name}: {cont.number}
              <DeleteBtn onClick={() => onDelete(cont.id)}>
                <MdDeleteForever color="#e84343" size={20} />
              </DeleteBtn>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>Not found!</p>
      )}
    </>
  );
};
