package sample;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.RadioButton;
import javafx.scene.control.ToggleGroup;
import javafx.scene.layout.GridPane;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class Main extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception{
        GridPane root = FXMLLoader.load(getClass().getResource("sample.fxml"));
        primaryStage.setTitle("Test application");
        GridPane grid = new GridPane();
        grid.setMinWidth(150);
        ToggleGroup group = new ToggleGroup();
        RadioButton button1 = new RadioButton("Button1");
        button1.setSelected(true);
        button1.setToggleGroup(group);
        grid.add(button1, 0, 0);
        RadioButton button2 = new RadioButton("Button2");
        button2.setToggleGroup(group);
        grid.add(button2, 0, 1);
        Text textItem = new Text(button1.getText() + " selected");
        grid.add(textItem, 1, 0);

        group.selectedToggleProperty().addListener(observable -> {
            RadioButton button = button1.isSelected() ? button1 : button2;
            textItem.setText(button.getText() + " selected");
        });
        root.add(grid, 0, 0);
        primaryStage.setScene(new Scene(root, 300, 300));
        primaryStage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
