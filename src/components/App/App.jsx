import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { Container } from './App.styled.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const errorNotify = () => {
    toast.error('Something went wrong!', {
      id: 'clipboard',
    });
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      {!contacts.length && !isLoading ? (
        <h2>No contacts</h2>
      ) : (
        <>
          <h2>Contacts</h2>
          {isLoading ? (
            <ThreeDots
              height="72"
              width="72"
              radius="8"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            <>
              <Filter />
            </>
          )}
          {contacts.length > 0 && <ContactList />}
        </>
      )}
      {error && errorNotify()}
      <Toaster />
    </Container>
  );
};
