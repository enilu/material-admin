package cn.enilu.flash.code;

public class CodeConfig {
    private String entityModel = "material-entity";
    private String daoModel = "material-dao";
    private String serviceModel = "material-service";
    private String controllerModel = "material-api";
    private String viewModel = "material-manage";
    public String getModel(String type){
        switch (type){
            case "model":
                return entityModel;
            case "repository":
                return daoModel;
            case "service":
                return serviceModel;
            case "controller":
                return controllerModel;
            case "view":
                return viewModel;
        }
        return null;
    }
    public String getEntityModel() {
        return entityModel;
    }

    public void setEntityModel(String entityModel) {
        this.entityModel = entityModel;
    }

    public String getDaoModel() {
        return daoModel;
    }

    public void setDaoModel(String daoModel) {
        this.daoModel = daoModel;
    }

    public String getServiceModel() {
        return serviceModel;
    }

    public void setServiceModel(String serviceModel) {
        this.serviceModel = serviceModel;
    }

    public String getControllerModel() {
        return controllerModel;
    }

    public void setControllerModel(String controllerModel) {
        this.controllerModel = controllerModel;
    }

    public String getViewModel() {
        return viewModel;
    }

    public void setViewModel(String viewModel) {
        this.viewModel = viewModel;
    }
}
