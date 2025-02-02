import pandas as pd

def calcular_pert(df):
    df['Tiempo_Esperado'] = (df['Optimista'] + 4 * df['Mas_Probable'] + df['Pesimista']) / 6
    df['Varianza'] = ((df['Pesimista'] - df['Optimista']) / 6) ** 2
    df['Desviacion_Estandar'] = df['Varianza'] ** 0.5
    return df

def calcular_indicadores(df):
    df['EV'] = df['Porcentaje_Completado'] * df['Costo_Planeado']
    df['PV'] = df['Costo_Planeado']
    df['AC'] = df['Costo_Real']
    df['CPI'] = df['EV'] / df['AC']
    return df
