//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.6 <0.9.0;

//custom errors to save gas 
error BookListEmpty();
error InvalidBookId();
error NotBookOwner();
contract Booklist{
    struct Book{
        uint id;
        string name;
        uint year;
        string author;
        bool isCompleted;
    }

    Book[] private bookList;
    mapping(uint256 => address) bookToOwner;

    event AddBook(address bookRecipient, uint bookId);
    event SetFinished(uint bookId, bool bookFinished);


    function addBook(string memory name, uint year, string memory author, bool isCompleted) external {
        uint bookId = bookList.length;
        bookList.push(Book(bookId, name, year, author, isCompleted));
        bookToOwner[bookId] = msg.sender;
        emit AddBook(msg.sender, bookId);
    }

    function getUnfinishedBook() external view returns (Book[] memory){
        return getBookList(false);
    }
    function getFinishedBook() external view returns (Book[] memory){
        return getBookList(true);
    }


    //we are calling setCompleted with bookId as argument 
    function setCompleted(uint _bookId) external bookExists(_bookId) onlyOwner(_bookId) {
        require(bookList[_bookId].isCompleted == false, "Book is already marked as completed");
        bookList[_bookId].isCompleted = true;
        emit SetFinished(_bookId, true);
    }

    //checking whether the sender of the contract and the owner address matches
    modifier onlyOwner(uint _bookId){
        require(msg.sender == bookToOwner[_bookId],"NotBookOwner()");
        _;
    }

    //checking whether the book exists or not
    modifier bookExists(uint _bookId){
        require(_bookId < bookList.length, "Book does not exist");
        _;
    }
    
    function getAllBooks() external view returns (Book[] memory) {
        return bookList;
    }


   function getBookList(bool finished) public view returns (Book[] memory){
        uint count = 0;
        for (uint index = 0; index < bookList.length; index++){
            if (bookToOwner[index] == msg.sender && bookList[index].isCompleted == finished){
                count++;
            }
        }
        Book[] memory temp = new Book[](count);
        uint tempIndex = 0;
        for (uint index = 0; index < bookList.length; index++){
            if (bookToOwner[index]==msg.sender && bookList[index].isCompleted == finished){
                temp[tempIndex] = bookList[index];
                tempIndex++;
            }
        }
        return temp;
    }
}
